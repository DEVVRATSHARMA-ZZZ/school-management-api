const express = require("express");
const connectToDb = require("./dbConnection");

(async () => {
  try {
    const db = await connectToDb();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

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
  console.log("Server is running ");
});
