const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api"
).replace(/\/$/, "");


// ======================================================
// Helper function
// ======================================================
async function request(endpoint, options = {}) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        }
    );

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error(
            "Server returned an invalid response."
        );
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            `Request failed with status ${response.status}`
        );
    }

    return data;
}


// ======================================================
// GET CRIME STATISTICS
// Dashboard
// ======================================================
export async function getCrimeStats() {
    return request("/crimes/stats");
}


// ======================================================
// GET CRIME RECORDS
// Crime Records page
// ======================================================
export async function getCrimes({
    page = 1,
    limit = 50,
    search = "",
    crimeType = "",
    district = "",
    arrest = "",
    year = "",
} = {}) {
    const params = new URLSearchParams();

    params.set("page", page);
    params.set("limit", limit);

    if (search.trim() !== "") {
        params.set("search", search.trim());
    }

    if (crimeType.trim() !== "") {
        params.set("crimeType", crimeType.trim());
    }

    if (district.trim() !== "") {
        params.set("district", district.trim());
    }

    if (arrest.trim() !== "") {
        params.set("arrest", arrest.trim());
    }

    if (year.trim() !== "") {
        params.set("year", year.trim());
    }

    return request(
        `/crimes?${params.toString()}`
    );
}


// ======================================================
// GET CRIME ANALYTICS
// Crime Analytics page
// ======================================================
export async function getCrimeAnalytics({
    year = "",
    crimeType = "",
    district = "",
} = {}) {
    const params = new URLSearchParams();

    if (year.trim() !== "") {
        params.set("year", year.trim());
    }

    if (crimeType.trim() !== "") {
        params.set(
            "crimeType",
            crimeType.trim()
        );
    }

    if (district.trim() !== "") {
        params.set(
            "district",
            district.trim()
        );
    }

    const queryString = params.toString();

    return request(
        `/crimes/analytics${
            queryString
                ? `?${queryString}`
                : ""
        }`
    );
}


// ======================================================
// DASHBOARD COMPATIBILITY FUNCTIONS
// ======================================================

// Get crime trends
export async function getCrimeTrends(filters = {}) {
    const data = await getCrimeAnalytics(filters);

    return data?.trendData || [];
}


// Get crime types
export async function getCrimeTypes(filters = {}) {
    const data = await getCrimeAnalytics(filters);

    return (
        data?.typeDistribution?.map(
            (item) => ({
                primary_type: item.type,
                count: item.count,
            })
        ) || []
    );
}


// Get districts
export async function getDistricts(filters = {}) {
    const data = await getCrimeAnalytics(filters);

    return (
        data?.districtData?.map(
            (item) => ({
                district: item.district,
                count: item.count,
            })
        ) || []
    );
}