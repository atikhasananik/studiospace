import type { IStudio } from "../type/studio.type";

/**
 * Backend base URL.
 *
 * - Local dev: unset → falls back to http://localhost:8000
 * - Production (Vercel): set NEXT_PUBLIC_API_URL to the deployed backend,
 *   e.g. https://studiospace-api.onrender.com — otherwise the fetch points
 *   at the server's own localhost, where no backend exists, and every
 *   data-driven section silently hides.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Fetches the top-rated studios from the backend.
 *
 * Never throws: returns `null` when the API is unreachable, responds with an
 * error status, or returns an unexpected payload — so a down backend hides
 * the section quietly instead of breaking the page or the production build.
 */
export const getTopRatedData = async (): Promise<IStudio[] | null> => {
  try {
    const res = await fetch(`${API_BASE}/toprateddata`);

    if (!res.ok) {
      console.warn(`getTopRatedData: API responded with ${res.status}`);
      return null;
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("getTopRatedData: unexpected payload shape");
      return null;
    }

    return data as IStudio[];
  } catch (err) {
    console.warn(
      "getTopRatedData: fetch failed —",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
};

export const getAllData = async (
  category?: string,
): Promise<IStudio[] | null> => {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`${API_BASE}/getalldata${query}`);

    if (!res.ok) {
      console.warn(`getAllData: API responded with ${res.status}`);
      return null;
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
      console.warn("getAllData: unexpected payload shape");
      return null;
    }

    return data as IStudio[];
  } catch (err) {
    console.warn(
      "getAllData: fetch failed —",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
};

export const getSingleData = async (id: string) => {
  const res = await fetch(`${API_BASE}/singlestudio/${id}`);
  const data = await res.json();
  return data;
};

export const getStudioById = async (id: string): Promise<IStudio | null> => {
  const studios = await getAllData();
  return studios?.find((studio) => studio._id === id) ?? null;
};

export const getMyListingsData = async (
  ownerEmail: string,
): Promise<IStudio[] | IStudio | null> => {
  try {
    const res = await fetch(
      `${API_BASE}/getmylistings/${encodeURIComponent(ownerEmail)}`,
    );

    if (!res.ok) {
      console.warn(`getMyListingsData: API responded with ${res.status}`);
      return null;
    }

    const data: unknown = await res.json();

    return data as IStudio[] | IStudio;
  } catch (err) {
    console.warn(
      "getMyListingsData: fetch failed —",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
};

export const getMyBookingsData = async (email: string): Promise<unknown> => {
  const res = await fetch(
    `${API_BASE}/mybookings/${encodeURIComponent(email)}`,
    { cache: "no-store" },
  );
  const data: unknown = await res.json();

  if (!res.ok) {
    return []
  }

  return data;
};


export const getMyOrdersData = async (email: string): Promise<unknown> => {
  const res = await fetch(
    `${API_BASE}/myorders/${encodeURIComponent(email)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    console.warn(`getMyOrdersData: API responded with ${res.status}`);
    throw new Error("Unable to load incoming orders. Please try again.");
  }

  return (await res.json()) as unknown;
};