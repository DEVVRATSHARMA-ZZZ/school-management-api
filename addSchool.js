const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
router.post("/", (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude) {
     res.status(400).send("All fields are required");
  }
  if (typeof name !== "string") {
     res.status(400).send("Name  must be strings");
     return;
  }
  if (typeof address !== "string") {
     res.status(400).send(" address must be strings");
     return;
  }
  if (typeof latitude !== "number") {
     res.status(400).send("Latitude must be float values");
     return;
  }
  if (typeof longitude !== "number") {
     res.status(400).send(" longitude must be float values");
     return;
  }
  const checkQuery =
    "SELECT * FROM schools WHERE latitude = ? AND longitude = ?";
  db.query(checkQuery, [latitude, longitude], (err, results) => {
    if (err) {
       res.status(500).send(`Error checking for existing school: ${err}`);
       return;
    }
    if (results.length > 0) {
       res.status(400).send("School already exists at this location");
       return;
    }
  });

  const querry =
    "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";
  db.query(querry, [name, address, latitude, longitude], (err, result) => {
    if (err) {
       res.status(500).send(`Inserting error :${err} `);
       return;
    } else {
      res.status(200).send(`school added succesfully`);
      console.log(`school added succesfully`);
      db.end();
    }
  });
});

module.exports = router;
