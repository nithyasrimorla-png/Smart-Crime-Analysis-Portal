const pool = require("../config/db");

// Get crime summary / dashboard statistics
const getCrimeStats = async (req, res) => {
    try {
        // Total crimes
        const totalResult = await pool.query(`
            SELECT COUNT(*) AS total
            FROM crimes
        `);

        // Crime types
        const crimeTypesResult = await pool.query(`
            SELECT primary_type, COUNT(*) AS count
            FROM crimes
            WHERE primary_type IS NOT NULL
            GROUP BY primary_type
            ORDER BY count DESC
        `);

        // Districts
        const districtsResult = await pool.query(`
            SELECT district, COUNT(*) AS count
            FROM crimes
            WHERE district IS NOT NULL
            GROUP BY district
            ORDER BY count DESC
        `);

        // Arrest analysis
        const arrestsResult = await pool.query(`
            SELECT arrest, COUNT(*) AS count
            FROM crimes
            WHERE arrest IS NOT NULL
            GROUP BY arrest
            ORDER BY arrest
        `);

        // Domestic crime analysis
        const domesticResult = await pool.query(`
            SELECT domestic, COUNT(*) AS count
            FROM crimes
            WHERE domestic IS NOT NULL
            GROUP BY domestic
            ORDER BY domestic
        `);

        res.json({
            success: true,
            totalCrimes: Number(totalResult.rows[0].total),
            crimeTypes: crimeTypesResult.rows,
            districts: districtsResult.rows,
            arrests: arrestsResult.rows,
            domestic: domesticResult.rows
        });

    } catch (error) {
        console.error("CRIME STATS ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime statistics"
        });
    }
};


// Get crime records with search, filters and pagination
const getCrimes = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            search = "",
            crimeType = "",
            district = "",
            arrest = "",
            year = ""
        } = req.query;

        const currentPage = Math.max(Number(page) || 1, 1);
        const pageLimit = Math.min(Number(limit) || 20, 500);
        const offset = (currentPage - 1) * pageLimit;

        const conditions = [];
        const values = [];

        // Search
        if (search.trim()) {
            values.push(`%${search.trim()}%`);

            conditions.push(`
                (
                    case_number ILIKE $${values.length}
                    OR description ILIKE $${values.length}
                    OR location_description ILIKE $${values.length}
                    OR primary_type ILIKE $${values.length}
                )
            `);
        }

        // Crime type
        if (crimeType) {
            values.push(crimeType);

            conditions.push(
                `primary_type = $${values.length}`
            );
        }

        // District
        if (district) {
            values.push(Number(district));

            conditions.push(
                `district = $${values.length}`
            );
        }

        // Arrest
        if (arrest !== "") {
            values.push(arrest === "true");

            conditions.push(
                `arrest = $${values.length}`
            );
        }

        // Year
        if (year) {
            values.push(Number(year));

            conditions.push(`
                EXTRACT(YEAR FROM date) = $${values.length}
            `);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        // Get total matching records
        const countResult = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM crimes
            ${whereClause}
            `,
            values
        );

        const total = Number(countResult.rows[0].total);

        // Get paginated records
        const dataValues = [...values];

        dataValues.push(pageLimit);
        const limitPosition = dataValues.length;

        dataValues.push(offset);
        const offsetPosition = dataValues.length;

        const result = await pool.query(
            `
            SELECT
                id,
                case_number,
                date,
                primary_type,
                description,
                location_description,
                arrest,
                domestic,
                district,
                latitude,
                longitude
            FROM crimes
            ${whereClause}
            ORDER BY date DESC
            LIMIT $${limitPosition}
            OFFSET $${offsetPosition}
            `,
            dataValues
        );

        res.json({
            success: true,
            total,
            page: currentPage,
            limit: pageLimit,
            totalPages: Math.ceil(total / pageLimit),
            records: result.rows
        });

    } catch (error) {
        console.error("CRIME RECORDS ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime records"
        });
    }
};


// Export controller functions
module.exports = {
    getCrimeStats,
    getCrimes
};