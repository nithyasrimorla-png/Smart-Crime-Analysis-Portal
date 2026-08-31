const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const crimeRoutes = require("./routes/crimeRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.json({
        message: "Smart Crime Analysis Portal API is running"
    });
});



app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total FROM crimes"
        );

        res.json({
            success: true,
            totalCrimes: Number(result.rows[0].total)
        });

    } catch (error) {
        console.error("DATABASE ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


app.use("/api/crimes", crimeRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});