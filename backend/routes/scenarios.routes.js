module.exports = app => {
    const scenarios = require("../controller/scenarios.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    router.get("/login", scenarios.findUserByUsernameAndPassword);
<<<<<<< HEAD
    router.get("/item-like-order",scenarios.showTopLikedAndOrderedItems);
  
=======
    router.get("/review/:itemId", scenarios.getReviewsbyItemID);

>>>>>>> 2fd57f3ea2d8103535c401d0bd4b4b324b40b1c1
    app.use('/api/scenarios', router);
};