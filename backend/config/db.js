const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: {
        rejectUnauthorized: false
    },

    max: 3,
    min: 0,

    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,

    keepAlive: true,
    keepAliveInitialDelayMillis: 10000
});

pool.on("connect", () => {
    console.log("Connected to Supabase PostgreSQL");
});

pool.on("error", (err) => {
    console.error("PostgreSQL pool error:", err.message);
});

module.exports = pool;