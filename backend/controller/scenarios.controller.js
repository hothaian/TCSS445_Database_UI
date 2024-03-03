const sql = require("../models/db");

exports.findUserByUsernameAndPassword = (req, res) => {
  const { username, password } = req.body;

  sql.query("SELECT * FROM phu_tin_and_ho_an.User WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    if (results.length > 0) {
      res.json({ message: "User found", user: results[0] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  });
};