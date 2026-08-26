// Central API service for the Smart Crime Analysis Portal.
//
// The backend (Node.js + Express + PostgreSQL/Supabase) has not been built yet.
// These functions define the CONTRACT the frontend expects. Set VITE_API_URL
// in a .env file once the backend is available; until then, calls throw and
// pages fall back to empty/loading states instead of fake data.

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(endpoint, options = {}) {
  if (!API_BASE_URL) {
    // Expected during frontend-only development — backend not connected yet.
    throw new Error('API_NOT_CONFIGURED');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed with status ${response.status}`);
  }

  return response.json();
}

function toQueryString(params = {}) {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  );
  const query = new URLSearchParams(cleaned).toString();
  return query ? `?${query}` : '';
}

// GET /api/crimes — supports pagination + filters (search, crimeType, district, arrest, year, location)
export function getCrimes(params = {}) {
  return request(`/api/crimes${toQueryString(params)}`);
}

// GET /api/crimes/stats — dashboard summary card values
export function getCrimeStats() {
  return request('/api/crimes/stats');
}

// GET /api/crimes/trends — time-series crime counts
export function getCrimeTrends(params = {}) {
  return request(`/api/crimes/trends${toQueryString(params)}`);
}

// GET /api/crimes/types — crime type distribution
export function getCrimeTypes(params = {}) {
  return request(`/api/crimes/types${toQueryString(params)}`);
}

// GET /api/crimes/districts — district-wise counts
export function getDistricts(params = {}) {
  return request(`/api/crimes/districts${toQueryString(params)}`);
}

// GET /api/crimes/map — records with latitude/longitude for the map view
export function getCrimeMapData(params = {}) {
  return request(`/api/crimes/map${toQueryString(params)}`);
}

export default {
  getCrimes,
  getCrimeStats,
  getCrimeTrends,
  getCrimeTypes,
  getDistricts,
  getCrimeMapData,
};