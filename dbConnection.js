require("dotenv").config();
const mysql = require("mysql2/promise");
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(async (req,res) => {
  try{console.log( `database succesfully connected`)}
  catch(err){res.status(500).send(`Error connecting to database: ${err}`);}
});
module.exports = db;
