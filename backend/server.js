const express = require("express");
const cors = require("cors");

const crimeRoutes = require("./routes/crimeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/crimes", crimeRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Crime Analysis Portal API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});