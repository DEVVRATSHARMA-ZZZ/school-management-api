require("dotenv").config();
const mysql = require("mysql2/promise");



async function connectToDB() {
  try {
    const db = mysql.createConnection(process.env.DATABASE_URL);

    console.log("Connected to the database successfully!");
    return db;
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw err;
  }
}

module.exports = connectToDB;
