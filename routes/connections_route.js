// get access to controller functions
const { createConnection, getConnections, getConnectionById, getConnectionsByCameraId, updateConnection, deleteConnection, getConnectionByRequestId, createConnections, getCameraWithAssignStatus } = require("../controllers/connections_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createConnection);
router.post('/add-cameras', createConnections);
router.get('/', getConnections);
router.post('/camera-with-connection', getCameraWithAssignStatus);
router.get('/:id', getConnectionById);
router.get('/request/:id', getConnectionByRequestId);
router.get('/camera/:id', getConnectionsByCameraId);
router.put('/', updateConnection);
router.delete('/:id', deleteConnection);

// export router
module.exports = router;