// get controllers
const { createCamera, getCameras, getCameraById, updateCamera, deleteCamera, getCameraByUserId,getCameraByLocation } = require("../controllers/camera_list_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createCamera);
router.get('/', getCameras);
router.get('/:id', getCameraById);
router.get('/user/:id', getCameraByUserId);
router.put('/', updateCamera);
router.delete('/:id', deleteCamera);
router.get('/user/:id/location/:location', getCameraByLocation);

// export router
module.exports = router;
