module.exports = app => {
    const scenarios = require("../controller/scenarios.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    router.post("/login", scenarios.findUserByUsernameAndPassword);
    router.get("/review/:itemId", scenarios.getReviewsbyItemID);
    router.get("/review", scenarios.getReviews);

    app.use('/api/scenarios', router);
};