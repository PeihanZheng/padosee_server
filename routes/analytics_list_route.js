// get controllers
const { createAnalytics, getAnalytics, getAnalyticsById, updateAnalytics, deleteAnalytics } = require("../controllers/analytics_list_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createAnalytics);
router.get('/', getAnalytics);
router.get('/:id', getAnalyticsById);
router.put('/', updateAnalytics);
router.delete('/:id', deleteAnalytics);

// export router
module.exports = router;