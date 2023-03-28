// get controllers
const { createAlert, getAlerts, getAlertById, updateAlert, deleteAlert } = require("../controllers/alerts_list_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createAlert);
router.get('/', getAlerts);
router.get('/:id', getAlertById);
router.put('/', updateAlert);
router.delete('/:id', deleteAlert);

// export router
module.exports = router;