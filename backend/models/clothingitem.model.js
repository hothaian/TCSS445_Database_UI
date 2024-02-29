const sql = require("./db.js");

// Constructor
const ClothingItem = function(clothingItem) {
  this.user_id = clothingItem.user_id;
  this.category = clothingItem.category;
  this.brand = clothingItem.brand;
  this.color = clothingItem.color;
  this.size = clothingItem.size;
  this.price = clothingItem.price;
  this.description = clothingItem.description;
  this.picture_url = clothingItem.picture_url;
};

// Create a new clothing item
ClothingItem.create = (newClothingItem, result) => {
  sql.query("INSERT INTO phu_tin_and_ho_an.ClothingItem SET ?", newClothingItem, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created clothing item: ", { item_id: res.insertId, ...newClothingItem });
    result(null, { item_id: res.insertId, ...newClothingItem });
  });
};

// Find clothing item by ID
ClothingItem.findById = (item_id, result) => {
  sql.query("SELECT * FROM phu_tin_and_ho_an.ClothingItem WHERE item_id = ?", item_id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found clothing item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Clothing item with the specified ID not found
    result({ kind: "not_found" }, null);
  });
};

// Get all clothing items
ClothingItem.getAll = (category, result) => {
  let query = "SELECT * FROM phu_tin_and_ho_an.ClothingItem";

  if (category) {
    query += ` WHERE category LIKE '%${category}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Clothing items: ", res);
    result(null, res);
  });
};

// Update clothing item by ID
ClothingItem.updateById = (item_id, clothingItem, result) => {
  sql.query(
    "UPDATE phu_tin_and_ho_an.ClothingItem SET category = ?, brand = ?, color = ?, size = ?, price = ?, description = ?, picture_url = ? WHERE item_id = ?",
    [clothingItem.category, clothingItem.brand, clothingItem.color, clothingItem.size, clothingItem.price, clothingItem.description, clothingItem.picture_url, item_id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Clothing item with the specified ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated clothing item: ", { item_id: item_id, ...clothingItem });
      result(null, { item_id: item_id, ...clothingItem });
    }
  );
};

// Delete clothing item by ID
ClothingItem.remove = (item_id, result) => {
  sql.query("DELETE FROM phu_tin_and_ho_an.ClothingItem WHERE item_id = ?", item_id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Clothing item with the specified ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted clothing item with item_id: ", item_id);
    result(null, res);
  });
};

// Delete all clothing items
ClothingItem.removeAll = result => {
  sql.query("DELETE FROM phu_tin_and_ho_an.ClothingItem", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} clothing items`);
    result(null, res);
  });
};

module.exports = ClothingItem;
