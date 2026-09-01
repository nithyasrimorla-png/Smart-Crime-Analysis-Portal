const pool = require("../config/db");

// ======================================================
// GET CRIME STATISTICS
// Dashboard statistics
// ======================================================
const getCrimeStats = async (req, res) => {
    try {
        // Total crimes
        const totalResult = await pool.query(`
            SELECT COUNT(*) AS total
            FROM crimes
        `);

        // Number of different crime types
        const crimeTypeCountResult = await pool.query(`
            SELECT COUNT(DISTINCT primary_type) AS count
            FROM crimes
            WHERE primary_type IS NOT NULL
        `);

        // Number of districts
        const districtCountResult = await pool.query(`
            SELECT COUNT(DISTINCT district) AS count
            FROM crimes
            WHERE district IS NOT NULL
        `);

        // Total arrests
        const arrestCountResult = await pool.query(`
            SELECT COUNT(*) AS count
            FROM crimes
            WHERE arrest = TRUE
        `);

        // Crime types
        const crimeTypesResult = await pool.query(`
            SELECT
                primary_type,
                COUNT(*) AS count
            FROM crimes
            WHERE primary_type IS NOT NULL
            GROUP BY primary_type
            ORDER BY count DESC
        `);

        // Districts
        const districtsResult = await pool.query(`
            SELECT
                district,
                COUNT(*) AS count
            FROM crimes
            WHERE district IS NOT NULL
            GROUP BY district
            ORDER BY count DESC
        `);

        // Arrest analysis
        const arrestsResult = await pool.query(`
            SELECT
                arrest,
                COUNT(*) AS count
            FROM crimes
            WHERE arrest IS NOT NULL
            GROUP BY arrest
            ORDER BY arrest
        `);

        // Domestic crime analysis
        const domesticResult = await pool.query(`
            SELECT
                domestic,
                COUNT(*) AS count
            FROM crimes
            WHERE domestic IS NOT NULL
            GROUP BY domestic
            ORDER BY domestic
        `);

        res.json({
            success: true,

            totalCrimes: Number(totalResult.rows[0].total),

            crimeTypeCount: Number(
                crimeTypeCountResult.rows[0].count
            ),

            districtCount: Number(
                districtCountResult.rows[0].count
            ),

            arrestCount: Number(
                arrestCountResult.rows[0].count
            ),

            crimeTypes: crimeTypesResult.rows.map((row) => ({
                primary_type: row.primary_type,
                count: Number(row.count),
            })),

            districts: districtsResult.rows.map((row) => ({
                district: row.district,
                count: Number(row.count),
            })),

            arrests: arrestsResult.rows.map((row) => ({
                arrest: row.arrest,
                count: Number(row.count),
            })),

            domestic: domesticResult.rows.map((row) => ({
                domestic: row.domestic,
                count: Number(row.count),
            })),
        });
    } catch (error) {
        console.error("CRIME STATS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime statistics",
        });
    }
};


// ======================================================
// GET CRIME RECORDS
// Search + filters + pagination
// ======================================================
const getCrimes = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 50,
            search = "",
            crimeType = "",
            district = "",
            arrest = "",
            year = "",
        } = req.query;

        const pageNumber = Math.max(
            Number(page) || 1,
            1
        );

        const limitNumber = Math.min(
            Math.max(Number(limit) || 50, 1),
            500
        );

        const offset =
            (pageNumber - 1) * limitNumber;

        const conditions = [];
        const values = [];

        // ------------------------------------------
        // Search
        // ------------------------------------------
        if (search.trim() !== "") {
            values.push(`%${search.trim()}%`);

            const searchPosition = values.length;

            conditions.push(`
                (
                    case_number ILIKE $${searchPosition}
                    OR block ILIKE $${searchPosition}
                    OR description ILIKE $${searchPosition}
                    OR location_description ILIKE $${searchPosition}
                )
            `);
        }

        // ------------------------------------------
        // Crime type
        // ------------------------------------------
        if (crimeType.trim() !== "") {
            values.push(crimeType.trim());

            conditions.push(
                `primary_type = $${values.length}`
            );
        }

        // ------------------------------------------
        // District
        // ------------------------------------------
        if (district.trim() !== "") {
            values.push(Number(district));

            conditions.push(
                `district = $${values.length}`
            );
        }

        // ------------------------------------------
        // Arrest
        // ------------------------------------------
        if (
            arrest === "true" ||
            arrest === "false"
        ) {
            values.push(arrest === "true");

            conditions.push(
                `arrest = $${values.length}`
            );
        }

        // ------------------------------------------
        // Year
        // ------------------------------------------
        if (year.trim() !== "") {
            values.push(Number(year));

            conditions.push(`
                EXTRACT(YEAR FROM date) = $${values.length}
            `);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        // ------------------------------------------
        // Count matching records
        // ------------------------------------------
        const countResult = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM crimes
            ${whereClause}
            `,
            values
        );

        const total =
            Number(countResult.rows[0].total);

        // ------------------------------------------
        // Pagination parameters
        // ------------------------------------------
        const dataValues = [...values];

        dataValues.push(limitNumber);
        const limitPosition = dataValues.length;

        dataValues.push(offset);
        const offsetPosition = dataValues.length;

        // ------------------------------------------
        // Fetch records
        // ------------------------------------------
        const result = await pool.query(
            `
            SELECT
                id,
                case_number,
                date,
                block,
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
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(
                total / limitNumber
            ),
            records: result.rows,
        });
    } catch (error) {
        console.error(
            "CRIME RECORDS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime records",
        });
    }
};


// ======================================================
// GET CRIME ANALYTICS
// Used by Crime Analytics page
// ======================================================
const getCrimeAnalytics = async (req, res) => {
    try {
        const {
            year = "",
            crimeType = "",
            district = "",
        } = req.query;

        const conditions = [];
        const values = [];

        if (year.trim() !== "") {
            values.push(Number(year));

            conditions.push(`
                EXTRACT(YEAR FROM date) = $${values.length}
            `);
        }

        if (crimeType.trim() !== "") {
            values.push(crimeType.trim());

            conditions.push(
                `primary_type = $${values.length}`
            );
        }

        if (district.trim() !== "") {
            values.push(Number(district));

            conditions.push(
                `district = $${values.length}`
            );
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        const typeCondition =
            conditions.length > 0
                ? `${whereClause} AND primary_type IS NOT NULL`
                : `WHERE primary_type IS NOT NULL`;

        const dateCondition =
            conditions.length > 0
                ? `${whereClause} AND date IS NOT NULL`
                : `WHERE date IS NOT NULL`;

        const districtCondition =
            conditions.length > 0
                ? `${whereClause} AND district IS NOT NULL`
                : `WHERE district IS NOT NULL`;

        const arrestCondition =
            conditions.length > 0
                ? `${whereClause} AND arrest IS NOT NULL`
                : `WHERE arrest IS NOT NULL`;

        const locationCondition =
            conditions.length > 0
                ? `${whereClause} AND location_description IS NOT NULL`
                : `WHERE location_description IS NOT NULL`;

        // ------------------------------------------
        // Crime Type Distribution
        // ------------------------------------------
        const typeResult = await pool.query(
            `
            SELECT
                primary_type,
                COUNT(*) AS count
            FROM crimes
            ${typeCondition}
            GROUP BY primary_type
            ORDER BY count DESC
            `,
            values
        );

        // ------------------------------------------
        // Crime Trends
        // ------------------------------------------
        let trendQuery;

        if (year.trim() !== "") {
            trendQuery = `
                SELECT
                    TO_CHAR(
                        DATE_TRUNC('month', date),
                        'Mon'
                    ) AS period,
                    COUNT(*) AS count
                FROM crimes
                ${dateCondition}
                GROUP BY DATE_TRUNC('month', date)
                ORDER BY DATE_TRUNC('month', date)
            `;
        } else {
            trendQuery = `
                SELECT
                    TO_CHAR(
                        DATE_TRUNC('year', date),
                        'YYYY'
                    ) AS period,
                    COUNT(*) AS count
                FROM crimes
                ${dateCondition}
                GROUP BY DATE_TRUNC('year', date)
                ORDER BY DATE_TRUNC('year', date)
            `;
        }

        const trendResult = await pool.query(
            trendQuery,
            values
        );

        // ------------------------------------------
        // District Analysis
        // ------------------------------------------
        const districtResult = await pool.query(
            `
            SELECT
                district,
                COUNT(*) AS count
            FROM crimes
            ${districtCondition}
            GROUP BY district
            ORDER BY count DESC
            `,
            values
        );

        // ------------------------------------------
        // Arrest Analysis
        // ------------------------------------------
        const arrestResult = await pool.query(
            `
            SELECT
                arrest,
                COUNT(*) AS count
            FROM crimes
            ${arrestCondition}
            GROUP BY arrest
            ORDER BY arrest
            `,
            values
        );

        // ------------------------------------------
        // Location Analysis
        // ------------------------------------------
        const locationResult = await pool.query(
            `
            SELECT
                location_description,
                COUNT(*) AS count
            FROM crimes
            ${locationCondition}
            GROUP BY location_description
            ORDER BY count DESC
            LIMIT 10
            `,
            values
        );

        res.json({
            success: true,

            typeDistribution:
                typeResult.rows.map((row) => ({
                    type: row.primary_type,
                    count: Number(row.count),
                })),

            trendData:
                trendResult.rows.map((row) => ({
                    period: row.period,
                    count: Number(row.count),
                })),

            districtData:
                districtResult.rows.map((row) => ({
                    district: String(row.district),
                    count: Number(row.count),
                })),

            arrestData:
                arrestResult.rows.map((row) => ({
                    label:
                        row.arrest === true
                            ? "Arrested"
                            : "Not Arrested",
                    count: Number(row.count),
                })),

            locationData:
                locationResult.rows.map((row) => ({
                    location:
                        row.location_description,
                    count: Number(row.count),
                })),
        });
    } catch (error) {
        console.error(
            "CRIME ANALYTICS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch crime analytics",
        });
    }
};