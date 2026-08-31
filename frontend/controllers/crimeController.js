const pool = require("../config/db");

// ==========================================
// GET CRIME STATISTICS
// ==========================================
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


const getCrimes = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 20, 1),
            100
        );

        const offset = (page - 1) * limit;

        const {
            search = "",
            crimeType = "",
            district = "",
            arrest = "",
            year = ""
        } = req.query;

        const conditions = [];
        const values = [];

        // Search
        if (search) {
            values.push(`%${search}%`);

            conditions.push(`
                (
                    case_number ILIKE $${values.length}
                    OR description ILIKE $${values.length}
                    OR location_description ILIKE $${values.length}
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

            conditions.push(
                `EXTRACT(YEAR FROM date) = $${values.length}`
            );
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
        const dataValues = [...values, limit, offset];

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
            LIMIT $${dataValues.length - 1}
            OFFSET $${dataValues.length}
            `,
            dataValues
        );

        res.json({
            success: true,
            total,
            page,
            limit,
            data: result.rows
        });

    } catch (error) {
        console.error("CRIME RECORDS ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime records"
        });
    }
};

module.exports = {
    getCrimeStats,
    getCrimes
};