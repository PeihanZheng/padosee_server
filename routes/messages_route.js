// get controller methods
const { createMessage, getMessages, getMessageById, updateMessage, deleteMessage } = require("../controllers/messages_controller.js");

// get router from express
const router = require('express').Router();

// routes
router.post('/', createMessage);
router.get('/', getMessages);
router.get('/:id', getMessageById);
router.put('/', updateMessage);
router.delete('/:id', deleteMessage);

// export router
module.exports = router;