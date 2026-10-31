import type { IStudio } from "../type/studio.type"

/**
 * Fetches the top-rated studios from the backend.
 *
 * Never throws: returns `null` when the API is unreachable, responds with an
 * error status, or returns an unexpected payload — so a down backend hides
 * the section quietly instead of breaking the page or the production build.
 */
export const getTopRatedData = async (): Promise<IStudio[] | null> => {
  try {
    const res = await fetch("http://localhost:8000/toprateddata")

    if (!res.ok) {
      console.warn(`getTopRatedData: API responded with ${res.status}`)
      return null
    }

    const data: unknown = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("getTopRatedData: unexpected payload shape")
      return null
    }

    return data as IStudio[]
  } catch (err) {
    console.warn(
      "getTopRatedData: fetch failed —",
      err instanceof Error ? err.message : err,
    )
    return null
  }
}
