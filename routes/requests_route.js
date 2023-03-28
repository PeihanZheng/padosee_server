// get the controllers
const { createRequest, getRequests, getRequestById, updateRequest, deleteRequest } = require('../controllers/requests_controller');

// get router from express
const router = require('express').Router();

// routes
router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id', getRequestById);
router.put('/', updateRequest);
router.delete('/:id', deleteRequest);

// export module
module.exports = router;