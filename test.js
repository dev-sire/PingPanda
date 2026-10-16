// cm59el6430001m0gdwyd5jsd6 (SOFIA API KEY)
// cm59r97yz000164ln4ntjrgl0 (Abdullah API KEY)

async function sendEvent() {
  try {
    const res = await fetch("https://pingpanda-devsire.vercel.app/api/v1/events", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Required for JSON bodies
        'Authorization': "Bearer cm58jx26i000111ms2vf5g944"
      },
      body: JSON.stringify({
        category: "bug",
        fields: {
          "App": "Visage", 
          "Issue": "Post not caching properly", 
          "Reported By": "Subhan"
        }
      })
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(`HTTP Error ${res.status}:`, responseText);
      return;
    }

    const data = JSON.parse(responseText);
    console.log("Success:", data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

sendEvent();