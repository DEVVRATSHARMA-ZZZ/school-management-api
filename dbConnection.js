require("dotenv").config();
const mysql = require("mysql2/promise");
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((req, res) => {
  console.log(`database succesfully connected`);
  res.status(500).send(`Error connecting to database: ${err}`);
});
module.exports = db;
