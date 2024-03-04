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
exports.getReviewsbyItemID = (req, res) => {
  // Extract the item_id from the request parameters
  const itemId = req.params.itemId;

  // Check if itemId is provided
  if (!itemId) {
    res.status(400).json({ error: 'itemId parameter is required' });
    return;
  }

  // Define the SQL query
  const query = `
    SELECT *
    FROM phu_tin_and_ho_an.Review
    WHERE item_id = ?;
  `;

  // Execute the query
  sql.query(query, [itemId], (err, results) => {
    if (err) {
      console.error('Error executing review query:', err);
      res.status(500).json({ error: 'Error executing review query' });
      return;
    }

    // Send the results back as JSON
    res.json(results);
  });
};