const ClothingItem = require("../models/clothingitem.model.js");

// Create and Save a new Clothing Item
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Clothing Item
  const clothingItem = new ClothingItem({
    user_id: req.body.user_id,
    category: req.body.category,
    brand: req.body.brand,
    color: req.body.color,
    size: req.body.size,
    price: req.body.price,
    description: req.body.description,
    picture_url: req.body.picture_url
  });

  // Save Clothing Item in the database
  ClothingItem.create(clothingItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clothing Item."
      });
    else res.send(data);
  });
};

// Retrieve all Clothing Items from the database.
exports.findAll = (req, res) => {
  const category = req.query.category;
  ClothingItem.getAll(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clothing items."
      });
    else res.send(data);
  });
};

// Find a single Clothing Item with an item_id
exports.findOne = (req, res) => {
  ClothingItem.findById(req.params.item_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Clothing Item with id ${req.params.item_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Clothing Item with id " + req.params.item_id
        });
      }
    } else res.send(data);
  });
};

// Update a Clothing Item identified by the item_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  ClothingItem.updateById(
    req.params.item_id,
    new ClothingItem(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Clothing Item with id ${req.params.item_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Clothing Item with id " + req.params.item_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Clothing Item with the specified item_id in the request
exports.delete = (req, res) => {
  ClothingItem.remove(req.params.item_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Clothing Item with id ${req.params.item_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Clothing Item with id " + req.params.item_id
        });
      }
    } else res.send({ message: `Clothing Item was deleted successfully!` });
  });
};

// Delete all Clothing Items from the database.
exports.deleteAll = (req, res) => {
  ClothingItem.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clothing items."
      });
    else res.send({ message: `All Clothing Items were deleted successfully!` });
  });
};
