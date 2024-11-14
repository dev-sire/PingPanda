import { j } from "./__internals/j"

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */

export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
