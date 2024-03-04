module.exports = app => {
    const scenarios = require("../controller/scenarios.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    router.get("/login", scenarios.findUserByUsernameAndPassword);
    router.get("/item-like-order",scenarios.showTopLikedAndOrderedItems);
  
    app.use('/api/scenarios', router);
};