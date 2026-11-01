import { IBookingData } from "../type/booking.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const postStudioData = async (data: Record<string, unknown>) => {
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


export const postBookingData = async (email : string,data :IBookingData) => {
  const res = await fetch(`${API_BASE}/addbooking/${email}`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      
    },
    body:JSON.stringify(data) 
  })

  return await res.json()

}
