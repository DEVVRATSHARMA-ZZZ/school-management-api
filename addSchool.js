const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
router.post("/",async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send("All fields are required");
  }
  if (typeof name !== "string") {
    return res.status(400).send("Name  must be strings");
  }
  if (typeof address !== "string") {
    return res.status(400).send(" address must be strings");
  }
  if (typeof latitude !== "number") {
    return res.status(400).send("Latitude must be float values");
  }
  if (typeof longitude !== "number") {
    return res.status(400).send(" longitude must be float values");
  }
  const checkQuery =
    "SELECT * FROM schools WHERE latitude = ? AND longitude = ?";
  db.query(checkQuery, [latitude, longitude], (err, results) => {
    if (err) {
      return res.status(500).send(`Error checking for existing school: ${err}`);
    }
    if (results.length > 0) {
      return res.status(400).send("School already exists at this location");
    }
  });

  const querry =
    "INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)";
 try{ db.query(querry, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).send(`Inserting error :${err} `);
    } else {
      res.status(200).send(`school added succesfully`);
      console.log(`school added succesfully`);
      return;
    }
  })}catch(err){
    return res.status(500).send(`Inserting error :${err} `);
  }
});

module.exports = router;
