const express = require("express");

const {
    getCrimeStats,
    getCrimes,
    getCrimeAnalytics,
} = require("../controllers/crimeController");

const router = express.Router();


router.get("/stats", getCrimeStats);



router.get("/analytics", getCrimeAnalytics);


router.get("/", getCrimes);


module.exports = router;