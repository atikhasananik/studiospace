
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"



export const deleteStudioData = async (id : string) => {

console.log(id)    
const res = await fetch(`${API_BASE}/deletestudio/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    console.warn(`deleteStudioData: API responded with ${res.status}`);
    return false;
  }

  const data: unknown = await res.json();

  return data;  
  
}
