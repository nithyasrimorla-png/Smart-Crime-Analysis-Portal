const getCrimes = (req, res) => {
    res.json({
        success: true,
        message: "Crime API is working",
        data: []
    });
};

const getCrimeStats = (req, res) => {
    res.json({
        success: true,
        message: "Crime statistics API is working",
        data: {}
    });
};

module.exports = {
    getCrimes,
    getCrimeStats
};