import { IStudio } from "../type/studio.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const postStudioData = async (data) => {
  const res = await fetch(`${API_BASE}/addstudio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = res.json()
  return resData;
};