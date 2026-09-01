const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getCrimeStats() {
  const response = await fetch(`${API_URL}/crimes/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch crime statistics");
  }

  return response.json();
}

export async function getCrimes(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/crimes?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch crime records");
  }

  return response.json();
}