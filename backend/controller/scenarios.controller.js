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
      res.status(404).json({ message: "User not found" });
    }
  });
};

exports.showTopLikedAndOrderedItems = (req, res) => {
  const query = `
    SELECT
        item_id,
        MAX(TotalLike) AS TotalLike,
        MAX(total_orders) AS total_orders
    FROM (
        SELECT
            l.item_id,
            COUNT(l.like_id) AS TotalLike,
            0 AS total_orders
        FROM
            phu_tin_and_ho_an.\`like\` l
        GROUP BY
            l.item_id

        UNION ALL

        SELECT
            o.item_id,
            0 AS TotalLike,
            COUNT(o.order_id) AS total_orders
        FROM
            phu_tin_and_ho_an.\`order\` o
        GROUP BY
            o.item_id
    ) AS subquery
    GROUP BY
        item_id
    ORDER BY
        TotalLike DESC, total_orders DESC
    LIMIT 5;
  `;

  sql.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    if (results.length > 0) {
      const topLikedAndOrderedItems = results.map(item => ({
        item_id: item.item_id,
        TotalLike: item.TotalLike,
        total_orders: item.total_orders,
      }));

      res.json({ message: "Top 5 most liked and ordered items", topLikedAndOrderedItems });
    } else {
      res.status(404).json({ message: "No items found" });
    }
  });
};
