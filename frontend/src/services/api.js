const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `Request to ${endpoint} failed with status ${response.status}`
    );
  }

  return await response.json();
}

function toQueryString(params = {}) {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== "" &&
        value !== undefined &&
        value !== null
    )
  );

  const query = new URLSearchParams(cleaned).toString();

  return query ? `?${query}` : "";
}

export function getCrimes(params = {}) {
  return request(
    `/api/crimes${toQueryString(params)}`
  );
}

export function getCrimeStats() {
  return request("/api/crimes/stats");
}

export function getCrimeTrends(params = {}) {
  return request(
    `/api/crimes/trends${toQueryString(params)}`
  );
}

export function getCrimeTypes(params = {}) {
  return request(
    `/api/crimes/types${toQueryString(params)}`
  );
}

export function getDistricts(params = {}) {
  return request(
    `/api/crimes/districts${toQueryString(params)}`
  );
}

export function getCrimeMapData(params = {}) {
  return request(
    `/api/crimes/map${toQueryString(params)}`
  );
}

export default {
  getCrimes,
  getCrimeStats,
  getCrimeTrends,
  getCrimeTypes,
  getDistricts,
  getCrimeMapData,
};