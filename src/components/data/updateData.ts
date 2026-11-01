import { TUpdatedData } from "../type/updateData.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"


  export const updateStudioData = async (id : string, updatedData: TUpdatedData) => {

    console.log(id, updatedData)
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
