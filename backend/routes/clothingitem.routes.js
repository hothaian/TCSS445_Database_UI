module.exports = app => {
    const clothingItems = require("../controller/clothingitem.controller");
  
    var router = require("express").Router();
  
    // Create a new Clothing Item
    router.post("/", clothingItems.create);
  
    // Retrieve all Clothing Items
    router.get("/", clothingItems.findAll);
  
    // Retrieve a single Clothing Item with item_id
    router.get("/:item_id", clothingItems.findOne);
  
    // Update a Clothing Item with item_id
    router.put("/:item_id", clothingItems.update);
  
    // Delete a Clothing Item with item_id
    router.delete("/:item_id", clothingItems.delete);
  
    // Delete all Clothing Items
    router.delete("/", clothingItems.deleteAll);
  
    app.use('/api/clothingitems', router);
};
