module.exports = app => {
    const analyticalController = require("../controller/analytical.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    // show list of pending order.
    router.get("/pendingOrder/:sellerId", analyticalController.getPenddingOrderForASeller);
    
    router.get("/investigate/:reportId", analyticalController.investigateASeller);




    app.use('/api/analytical', router);
};