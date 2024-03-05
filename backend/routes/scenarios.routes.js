module.exports = app => {
    const scenarios = require("../controller/scenarios.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    router.post("/login", scenarios.findUserByUsernameAndPassword);
    router.get("/review/:itemId", scenarios.getReviewsbyItemID);

    app.use('/api/scenarios', router);
};