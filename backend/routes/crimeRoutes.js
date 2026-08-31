const express = require("express");

const {
    getCrimeStats,
    getCrimes
} = require("../controllers/crimeController");

const router = express.Router();

router.get("/stats", getCrimeStats);

router.get("/", getCrimes);

module.exports = router;