const pool = require("../config/db");


const getCrimes = async (req, res) => {
    try {
        const limit = Math.min(
            parseInt(req.query.limit) || 100,
            500
        );

        const offset = Math.max(
            parseInt(req.query.offset) || 0,
            0
        );

        const result = await pool.query(
            `
            SELECT *
            FROM crimes
            ORDER BY date DESC
            LIMIT $1 OFFSET $2
            `,
            [limit, offset]
        );

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error("GET CRIMES ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getCrimeStats = async (req, res) => {
    try {
        const totalResult = await pool.query(
            `SELECT COUNT(*) AS total FROM crimes`
        );

        const crimeTypesResult = await pool.query(
            `
            SELECT primary_type, COUNT(*) AS count
            FROM crimes
            WHERE primary_type IS NOT NULL
            GROUP BY primary_type
            ORDER BY count DESC
            `
        );

        const districtResult = await pool.query(
            `
            SELECT district, COUNT(*) AS count
            FROM crimes
            WHERE district IS NOT NULL
            GROUP BY district
            ORDER BY count DESC
            `
        );

        const arrestResult = await pool.query(
            `
            SELECT arrest, COUNT(*) AS count
            FROM crimes
            GROUP BY arrest
            `
        );

        const domesticResult = await pool.query(
            `
            SELECT domestic, COUNT(*) AS count
            FROM crimes
            GROUP BY domestic
            `
        );

        res.json({
            success: true,

            totalCrimes: Number(totalResult.rows[0].total),

            crimeTypes: crimeTypesResult.rows,

            districts: districtResult.rows,

            arrests: arrestResult.rows,

            domestic: domesticResult.rows
        });

    } catch (error) {
        console.error("STATS ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const searchCrimes = async (req, res) => {
    try {
        const {
            type,
            district,
            arrest,
            domestic,
            limit = 100
        } = req.query;

        const conditions = [];
        const values = [];

        let parameterIndex = 1;

        if (type) {
            conditions.push(`primary_type = $${parameterIndex}`);
            values.push(type);
            parameterIndex++;
        }

        if (district) {
            conditions.push(`district = $${parameterIndex}`);
            values.push(district);
            parameterIndex++;
        }

        if (arrest !== undefined) {
            conditions.push(`arrest = $${parameterIndex}`);
            values.push(arrest === "true");
            parameterIndex++;
        }

        if (domestic !== undefined) {
            conditions.push(`domestic = $${parameterIndex}`);
            values.push(domestic === "true");
            parameterIndex++;
        }

        const safeLimit = Math.min(
            parseInt(limit) || 100,
            500
        );

        values.push(safeLimit);

        let query = `
            SELECT *
            FROM crimes
        `;

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        query += `
            ORDER BY date DESC
            LIMIT $${parameterIndex}
        `;

        const result = await pool.query(query, values);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.error("SEARCH ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getCrimes,
    getCrimeStats,
    searchCrimes
};