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