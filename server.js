const express = require("express");
const db = require("./dbConnection");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the School API!");
});
const addSchool = require("./addSchool");
const listSchool = require("./listSchool");
app.use("/addSchool", addSchool);
app.use("/listSchool", listSchool);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
