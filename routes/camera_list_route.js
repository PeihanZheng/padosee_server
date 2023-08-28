// get controllers
const { createCamera, getCameras, getCameraById, updateCamera, deleteCamera, getCameraByUserId,getCameraByLocation } = require("../controllers/camera_list_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createCamera);
router.get('/', getCameras);
router.get('/:id', getCameraById);
router.get('/user/:id', getCameraByUserId);
router.get('/user/:id/location/:location', getCameraByLocation);
router.put('/', updateCamera);
router.delete('/:id', deleteCamera);

// export router
module.exports = router;
