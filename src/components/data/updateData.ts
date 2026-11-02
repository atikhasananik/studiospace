import { TUpdatedData } from "../type/updateData.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"


  export const updateStudioData = async (id : string, updatedData: TUpdatedData) => {

    const res = await fetch(`${API_BASE}/updatestudio/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
  
    if (!res.ok) {
      console.warn(`updateStudioData: API responded with ${res.status}`);
      return false;
    }
  
    const data: unknown = await res.json();
  
    return data;  
  }     

export type UpdateBookingStatusResult = { modifiedCount: number } | false;

export const updatebookingstatus = async (
  id: string,
  updatedData: "cancelled",
): Promise<UpdateBookingStatusResult> => {
  const res = await fetch(`${API_BASE}/updatebookingstatus/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: updatedData }),
  });

  if (!res.ok) {
    console.warn(`updatebookingstatus: API responded with ${res.status}`);
    return false;
  }

  const data: unknown = await res.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "modifiedCount" in data &&
    typeof data.modifiedCount === "number"
  ) {
    return { modifiedCount: data.modifiedCount };
  }

  throw new Error("The booking service returned an unexpected response.");
};