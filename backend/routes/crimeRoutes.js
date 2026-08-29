const express = require("express");

const {
    getCrimes,
    getCrimeStats
} = require("../controllers/crimeController");

const router = express.Router();

router.get("/", getCrimes);
router.get("/stats", getCrimeStats);

module.exports = router;