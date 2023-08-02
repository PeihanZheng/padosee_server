// get the controllers
const { createRequest, getRequests, getRequestById, getRequestsBySenderId, getRequestsByReceiverId, getUserBySenderId, getUsersByAddStatus, updateRequest, deleteRequest } = require('../controllers/requests_controller');

// get router from express
const router = require('express').Router();

// routes
router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id', getRequestById);
router.get('/sender/:id', getRequestsBySenderId);
router.get('/receiver/:id', getRequestsByReceiverId);
router.get('/sender/user/:id', getUserBySenderId);
router.get('/sender/user/:addStatus/:id', getUsersByAddStatus);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

// export module
module.exports = router;
