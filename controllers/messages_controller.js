// import pool queries from service
const { create, getMessages, getMessageById, updateMessage, deleteMessage } = require('../services/messages_service');

// export controller
module.exports = {
    // create message
    createMessage: (req, res) => {
        // request body
        const body = req.body;

        // insert message
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: 'Unable to insert record...'
                });
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        });
    },
    // get all messages
    getMessages: (req, res) => {
        // get all messages
        getMessages((error, results) => {
            if (error) {
                console.log(error);
                return;
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get message by id
    getMessageById: (req, res) => {
        // get params id
        const id  = req.params.id;

        // get message by id
        getMessageById(id, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: 'Record not found...'
                });
            } else {
                res.status(200).json({
                    success: 1, 
                    data: results
                });
            }
        });
    }, 
    // update message
    updateMessage: (req, res) => {
        // get body from requests
        const body = req.body;

        // update message
        updateMessage(body, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: 'Failed to update record...'
                });
            } else {
                res.status(200).json({
                    success: 1,
                    message: 'Updated successfully...'
                });
            }
        });
    }, 
    // delete message
    deleteMessage: (req, res) => {
        // get id from params
        const id = req.params.id;

        // delete message
        deleteMessage(id, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: 'Failed to delete record...'
                });
            } else {
                res.status(200).json({
                    success: 1, 
                    message: 'Deleted successfully...'
                });
            }
        });
    }
}