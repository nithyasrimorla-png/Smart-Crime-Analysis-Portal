const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  try {
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
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
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

// Get crime records
export function getCrimes(params = {}) {
  return request(
    `/api/crimes${toQueryString(params)}`
  );
}

// Get dashboard statistics
export function getCrimeStats() {
  return request("/api/crimes/stats");
}

// Get crime trends
export function getCrimeTrends(params = {}) {
  return request(
    `/api/crimes/trends${toQueryString(params)}`
  );
}

// Get crime type distribution
export function getCrimeTypes(params = {}) {
  return request(
    `/api/crimes/types${toQueryString(params)}`
  );
}

// Get district-wise crime counts
export function getDistricts(params = {}) {
  return request(
    `/api/crimes/districts${toQueryString(params)}`
  );
}

// Get crime map data
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