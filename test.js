/**
 * PingPanda API test runner  (Node 18+, no dependencies)
 *
 * Usage (PowerShell):
 *   $env:API_KEY = "your-key"
 *   $env:CATEGORY = "new-user"            # optional, default "new-user"
 *   $env:BASE_URL = "http://localhost:3000"  # optional, this is the default
 *   node test.js
 *
 * Optional keys unlock the cases that need a specific account state:
 *   KEY_NO_DISCORD      user with NO Discord ID saved      -> DISCORD_ID_MISSING
 *   KEY_NOT_IN_SERVER   user whose Discord ID is NOT in the server (or DMs closed) -> USER_NOT_IN_SERVER
 *   KEY_QUOTA_FULL      user already at their monthly limit -> QUOTA_EXCEEDED
 *
 * SKIP_SEND=1 skips the happy-path case (it sends a real Discord DM and uses 1 quota).
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "")
const ENDPOINT = `${BASE_URL}/api/v1/events`

const KEY = process.env.API_KEY
const CATEGORY = process.env.CATEGORY || "new-user"
const KEY_NO_DISCORD = process.env.KEY_NO_DISCORD
const KEY_NOT_IN_SERVER = process.env.KEY_NOT_IN_SERVER
const KEY_QUOTA_FULL = process.env.KEY_QUOTA_FULL

if (!KEY) {
  console.error("Set API_KEY first, e.g.  $env:API_KEY = \"your-key\"")
  process.exit(1)
}

const validBody = {
  category: CATEGORY,
  fields: { Plan: "Free", Source: "test.js", Signups: 1 },
  description: "Test event from test.js",
}

async function call({ key, headers, body, raw }) {
  const h = { "Content-Type": "application/json", ...(headers || {}) }
  if (key) h.Authorization = `Bearer ${key}`
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: h,
    body: raw !== undefined ? raw : JSON.stringify(body),
  })
  const text = await res.text()
  let json = null
  try { json = JSON.parse(text) } catch {}
  return { status: res.status, json, text }
}

const cases = [
  {
    name: "Missing Authorization header",
    run: () => call({ body: validBody }),
    expect: { status: 401, code: "MISSING_AUTH_HEADER" },
  },
  {
    name: "Wrong auth scheme (not Bearer)",
    run: () => call({ headers: { Authorization: "Token abc123" }, body: validBody }),
    expect: { status: 401, code: "INVALID_AUTH_FORMAT" },
  },
  {
    name: "Unknown API key",
    run: () => call({ key: "this-key-does-not-exist", body: validBody }),
    expect: { status: 401, code: "INVALID_API_KEY" },
  },
  {
    name: "Malformed JSON body",
    run: () => call({ key: KEY, raw: "{ not valid json" }),
    expect: { status: 400, code: "INVALID_JSON" },
  },
  {
    name: "Validation: unexpected extra property",
    run: () => call({ key: KEY, body: { ...validBody, surprise: true } }),
    expect: { status: 422, code: "VALIDATION_ERROR" },
  },
  {
    name: "Validation: illegal characters in category name",
    run: () => call({ key: KEY, body: { ...validBody, category: "bad name!" } }),
    expect: { status: 422, code: "VALIDATION_ERROR" },
  },
  {
    name: "Validation: field value is an object (only string/number/boolean allowed)",
    run: () => call({ key: KEY, body: { ...validBody, fields: { nested: { a: 1 } } } }),
    expect: { status: 422, code: "VALIDATION_ERROR" },
  },
  {
    name: "Category that doesn't exist",
    run: () => call({ key: KEY, body: { ...validBody, category: "no-such-category-xyz" } }),
    expect: { status: 404, code: "CATEGORY_NOT_FOUND" },
  },
  {
    name: "Happy path: event delivered to Discord DM",
    skip: process.env.SKIP_SEND === "1" ? "SKIP_SEND=1" : null,
    run: () => call({ key: KEY, body: validBody }),
    expect: { status: 200, eventId: true },
  },
  {
    name: "User has no Discord ID saved",
    skip: KEY_NO_DISCORD ? null : "set KEY_NO_DISCORD",
    run: () => call({ key: KEY_NO_DISCORD, body: validBody }),
    expect: { status: 403, code: "DISCORD_ID_MISSING" },
  },
  {
    name: "User not in server / DMs closed",
    skip: KEY_NOT_IN_SERVER ? null : "set KEY_NOT_IN_SERVER",
    run: () => call({ key: KEY_NOT_IN_SERVER, body: validBody }),
    expect: { status: 403, code: "USER_NOT_IN_SERVER", eventId: true },
  },
  {
    name: "Monthly quota exhausted",
    skip: KEY_QUOTA_FULL ? null : "set KEY_QUOTA_FULL",
    run: () => call({ key: KEY_QUOTA_FULL, body: validBody }),
    expect: { status: 429, code: "QUOTA_EXCEEDED" },
  },
]

function check(result, expect) {
  const problems = []
  if (result.status !== expect.status) problems.push(`status ${result.status} (wanted ${expect.status})`)
  if (expect.code && result.json?.code !== expect.code) {
    problems.push(`code ${result.json?.code ?? "none"} (wanted ${expect.code})`)
  }
  if (expect.eventId && !result.json?.eventId) problems.push("no eventId in response")
  if (expect.status >= 400 && !result.json?.message) problems.push("no message in error response")
  return problems
}

async function main() {
  console.log(`Target: ${ENDPOINT}\nCategory: ${CATEGORY}\n`)
  let passed = 0, failed = 0, skipped = 0

  for (const c of cases) {
    if (c.skip) {
      console.log(`SKIP  ${c.name}  (${c.skip})`)
      skipped++
      continue
    }

    let result
    try {
      result = await c.run()
    } catch (err) {
      console.log(`FAIL  ${c.name}\n      could not reach server: ${err.message}`)
      failed++
      continue
    }

    const problems = check(result, c.expect)
    if (problems.length === 0) {
      console.log(`PASS  ${c.name}  -> ${result.status} ${result.json?.code ?? ""}`.trimEnd())
      passed++
    } else {
      console.log(`FAIL  ${c.name}\n      ${problems.join("; ")}\n      body: ${result.text.slice(0, 300)}`)
      failed++
    }
  }

  console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`)
  console.log(
    "\nManual checks: open the category page in the dashboard. The happy-path row should be DELIVERED,\n" +
    "and the USER_NOT_IN_SERVER row (if run) should be FAILED with its error code and message under the badge."
  )
  process.exit(failed ? 1 : 0)
}

main()