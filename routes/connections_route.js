// get access to controller functions
const { createConnection, getConnections, getConnectionById, getConnectionsByCameraId, updateConnection, deleteConnection } = require("../controllers/connections_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createConnection);
router.get('/', getConnections);
router.get('/:id', getConnectionById);
router.get('/camera/:id', getConnectionsByCameraId);
router.put('/', updateConnection);
router.delete('/:id', deleteConnection);

// export router
module.exports = router;