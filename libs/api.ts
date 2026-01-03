import api from "./axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Fetch<T>(endpoint: string) {
  const res = await api.get(`${API_URL}/${endpoint}`);

  
  if (res.status!==200) throw new Error(`API request failed with status ${res.status}`);

  const data: T = await res.data;
    return { data };
}



