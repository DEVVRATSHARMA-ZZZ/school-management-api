require("dotenv").config();
const mysql = require("mysql2");




  
    const db = mysql.createConnection(process.env.DATABASE_URL);
    db.connect((err) => {
      if (err) {
        console.error("Database connection failed:", err);
        return;
      }
      console.log("Connected to the database.");
    });

   

module.exports = db;
