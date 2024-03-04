const sql = require("../models/db");
exports.getPenddingOrderForASeller = (req, res) => {
    // Extract the seller_id from the request parameters
    const sellerId = req.params.sellerId;
  
    // Check if sellerId is provided
    if (!sellerId) {
      res.status(400).json({ error: 'sellerId parameter is required' });
      return;
    }
  
    const query = `
      SELECT 
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
        console.error('Error executing analytical query:', err);
        res.status(500).json({ error: 'Error executing analytical query' });
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
        res.status(400).json({ error: 'reportId parameter is required' });
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
          console.error('Error executing analytical query:', err);
          res.status(500).json({ error: 'Error executing analytical query' });
          return;
        }

        res.json(results);
      });
  };