const express = require("express");
const db = require("./dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  const userLatitude = parseFloat(req.query.latitude);
  const userLongitude = parseFloat(req.query.longitude);

  if (!userLatitude || !userLongitude) {
    return res.status(400).send("Latitude and longitude are required");
  }

  const query = `
        SELECT 
            id, 
            name, 
            address, 
            latitude, 
            longitude, 
            (
                6371 * ACOS(
                    COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
                    COS(RADIANS(longitude) - RADIANS(?)) + 
                    SIN(RADIANS(?)) * SIN(RADIANS(latitude))
                )
            ) AS distance
        FROM schools
        ORDER BY distance ASC;
    `;

  db.query(
    query,
    [userLatitude, userLongitude, userLatitude],
    (err, results) => {
      if (err) {
        console.error("Error fetching schools:", err);
        res.status(500).send("Failed to fetch schools");
        return;
      }
      const resultsWithDistance = results.map((school) => ({
        ...school,
        distance: school.distance.toFixed(2) + " km",
      }));

      res.status(200).json(resultsWithDistance);
    }
  );
});

module.exports = router;
