module.exports = app => {
    const analyticalController = require("../controller/analytical.controller");
  
    var router = require("express").Router();
  
    // Route to handle analytical queries
    // show list of pending order.
    router.get("/pendingOrder/:sellerId", analyticalController.getPenddingOrderForASeller);
    router.get("/pendingOrders/", analyticalController.getAllPendingOrders);

    router.get("/investigate/:reportId", analyticalController.investigateASeller);
    router.get("/reported-sellers", analyticalController.getAllReportedSellers);

    router.get('/popular-tag', analyticalController.showPopularTag);

    router.get('/top-buyers', analyticalController.topBuyersByTotalSpent);
    router.get('/item-with-most-like-order', analyticalController.showMostLikedAndOrderedItem);

    app.use('/api/analytical', router);
};