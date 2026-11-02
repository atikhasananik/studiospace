const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const deleteStudioData = async (id: string, token: string) => {
  const res = await fetch(`${API_BASE}/deletestudio/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.warn(`deleteStudioData: API responded with ${res.status}`);
    return false;
  }

  const data: unknown = await res.json();

  return data;
};
