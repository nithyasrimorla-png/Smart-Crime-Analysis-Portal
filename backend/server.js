const express = require("express");
const cors = require("cors");
require("dotenv").config();

const crimeRoutes = require("./routes/crimeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Crime Analysis Portal Backend is running!"
    });
});

// Crime routes
app.use("/api/crimes", crimeRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});