// get controllers
const { createCamera, getCameras, getCameraById, getCamerasByUserId, getCamerasByUserIdAndLocation, getCameraBySenderId, updateCamera, deleteCamera } = require("../controllers/camera_list_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createCamera);
router.get('/', getCameras);
router.get('/:id', getCameraById);
router.get('/user/:id', getCamerasByUserId);
router.get('/user/:id/location/:location', getCamerasByUserIdAndLocation);
router.get('/sender/:id', getCameraBySenderId);
router.put('/', updateCamera);
router.delete('/:id', deleteCamera);

// export router
module.exports = router;
