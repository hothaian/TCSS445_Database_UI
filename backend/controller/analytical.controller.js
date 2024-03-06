const sql = require("../models/db");
exports.getPenddingOrderForASeller = (req, res) => {
  // Extract the seller_id from the request parameters
  const sellerId = req.params.sellerId;

  // Check if sellerId is provided
  if (!sellerId) {
    res.status(400).json({ error: "sellerId parameter is required" });
    return;
  }

  const query = `
      SELECT 
          O.seller_id,
          O.order_id,
          O.buyer_id,
          O.item_id,
          B.username AS buyer_username,
          B.email AS buyer_email,
          SA.address_line1,
          SA.city,
          SA.state,
          SA.zip_code
      FROM 
          phu_tin_and_ho_an.Order O
      JOIN 
          phu_tin_and_ho_an.User B ON O.buyer_id = B.user_id
      JOIN 
          phu_tin_and_ho_an.ShippingAddress SA ON O.address_id = SA.address_id
      WHERE 
          O.status = 'Pending'
          AND O.seller_id = ?;
    `;

  sql.query(query, sellerId, (err, results) => {
    if (err) {
      console.error("Error executing analytical query:", err);
      res.status(500).json({ error: "Error executing analytical query" });
      return;
    }

    res.json(results);
  });
};
exports.investigateASeller = (req, res) => {
  // Extract the seller_id from the request parameters
  const reportId = req.params.reportId;

  // Check if reportId is provided
  if (!reportId) {
    res.status(400).json({ error: "reportId parameter is required" });
    return;
  }

  // Define the SQL query
  const query = `
        SELECT DISTINCT
            CI.item_id,
            CI.user_id AS seller_id,
            CI.price,
            CI.description,
            R.review_id,
            R.text AS review_text,
            O.status AS order_status
        FROM 
            phu_tin_and_ho_an.Report RP
        INNER JOIN 
            phu_tin_and_ho_an.ClothingItem CI ON RP.reported_user_id = CI.user_id
        LEFT JOIN 
            phu_tin_and_ho_an.Review R ON CI.item_id = R.item_id
        LEFT JOIN 
            phu_tin_and_ho_an.Order O ON CI.item_id = O.item_id
        WHERE 
            RP.report_id = ?;
      `;

  // Execute the query
  sql.query(query, [reportId], (err, results) => {
    if (err) {
      console.error("Error executing analytical query:", err);
      res.status(500).json({ error: "Error executing analytical query" });
      return;
    }

    res.json(results);
  });
};

exports.showMostLikedAndOrderedItem = (req, res) => {
  const query = `
    SELECT
        item_id,
        MAX(TotalLike) AS TotalLike,
        MAX(total_orders) AS total_orders
    FROM (
        SELECT
            l_table.item_id,
            COUNT(l_table.like_id) AS TotalLike,
            0 AS total_orders
        FROM
            phu_tin_and_ho_an.like l_table
        GROUP BY
            l_table.item_id

        UNION ALL

        SELECT
            o.item_id,
            0 AS TotalLike,
            COUNT(o.order_id) AS total_orders
        FROM
            phu_tin_and_ho_an.order o
        GROUP BY
            o.item_id
    ) AS subquery
    GROUP BY
        item_id
    ORDER BY
        TotalLike DESC, total_orders DESC;
    `;

  sql.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    if (results.length > 0) {
      const mostLikedAndOrderedItems = results.map((item) => ({
        item_id: item.item_id,
        TotalLike: item.TotalLike,
        total_orders: item.total_orders,
      }));

      res.json({
        message: "Most liked and ordered items",
        mostLikedAndOrderedItems,
      });
    } else {
      res.status(404).json({ message: "No items found" });
    }
  });
};

exports.showPopularTag = (req, res) => {
  const query = `
      SELECT 
        T.tag_name,
        COUNT(*) AS tag_count
      FROM 
        phu_tin_and_ho_an.Order O
      JOIN 
        phu_tin_and_ho_an.ItemTag IT ON O.item_id = IT.item_id
      JOIN 
        phu_tin_and_ho_an.Tag T ON IT.tag_id = T.tag_id
      GROUP BY 
        T.tag_name
      ORDER BY 
        tag_count DESC;
    `;

  sql.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    if (results.length > 0) {
      const tagCounts = results.map((row) => ({
        tag_name: row.tag_name,
        tag_count: row.tag_count,
      }));

      res.json({
        message: "Popular tag counts retrieved successfully",
        tagCounts,
      });
    } else {
      res.status(404).json({ message: "No popular tags found" });
    }
  });
};

exports.topBuyersByTotalSpent = (req, res) => {
  const query = `
      SELECT
          order_table.buyer_id,
          SUM(payment.amount) AS total_spent
      FROM
          phu_tin_and_ho_an.payment
      JOIN
          phu_tin_and_ho_an.\`order\` AS order_table ON payment.order_id = order_table.order_id
      GROUP BY
          order_table.buyer_id
      ORDER BY
          total_spent DESC
      LIMIT 10;
    `;

  sql.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    if (results.length > 0) {
      const topBuyers = results.map((result) => ({
        buyer_id: result.buyer_id,
        total_spent: result.total_spent,
      }));

      res.json({ message: "Top buyers by total spent", topBuyers });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  });
};

exports.getAllPendingOrders = (req, res) => {
  const query = `
    SELECT 
    O.seller_id,
    O.order_id,
    O.buyer_id,
    O.item_id,
    B.username AS buyer_username,
    B.email AS buyer_email,
    SA.address_line1,
    SA.city,
    SA.state,
    SA.zip_code
  FROM 
    phu_tin_and_ho_an.Order O
  JOIN 
    phu_tin_and_ho_an.User B ON O.buyer_id = B.user_id
  JOIN 
    phu_tin_and_ho_an.ShippingAddress SA ON O.address_id = SA.address_id
  WHERE 
    O.status = 'Pending';
    `;

  sql.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ message: "Error executing SQL query" });
      return;
    }

    res.json(results);
  });
};
