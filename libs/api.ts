const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetch<T>(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

  const data: T = await res.json();
  const count = Number(res.headers.get("X-Total-Count") ?? (Array.isArray(data) ? data.length : 1));

  console.log(`Total rows for ${endpoint}:`, count);

  return { data, count };
}

