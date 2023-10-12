// get pool query from service
const { create, getAlerts, getAlertById, getAlertByUserId, getAlertsByPrimaryUser, updateAlert, deleteAlert } = require('../services/alerts_list_service.js');
const socket = require('socket.io-client')('http://localhost:5500'); // change the port depending on the server

// export controller
module.exports = {
    // create alert
    createAlert: (req, res) => {
        // request body
        const body = req.body;

        // create new alert
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to insert record..."
                });
            } else {
                res.status(200).json({
                    success: 1,
                    message: results
                });

                // send alert to client
                socket.emit('alert', results);
            }
        });
    },
    // get all alerts
    getAlerts: (req, res) => {
        // get all alerts
        getAlerts((error, results) => {
            if (error) {
                console.log(error);
                return;
            } else {
                res.json({
                    success: 1,
                    data: results
                });

                // send alerts to client
                socket.emit('alerts', results);
            }
        });
    },
    // get alert by id
    getAlertById: (req, res) => {
        // get id from request
        const id = req.params.id;

        // get alert by id
        getAlertById(id, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Record not found..."
                })
            } else {
                res.json({
                    success: 1,
                    data: results
                })
            }
        });
    },
    // get alerts by user id
    getAlertByUserId: (req, res) => {
        // get id from request
        const id = req.params.id;

        // get alert by user id
        getAlertByUserId(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to get record..."
                });
            } else if (!results || results.length === 0) {
                // handle error
                res.status(404).json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                // send results
                res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get alerts by primary user id
    getAlertsByPrimaryUser: (req, res) => {
        // get id from request
        const id = req.params.id;

        // get alerts by primary user id
        getAlertsByPrimaryUser(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to get record..."
                });
            } else if (results.length === 0) {
                // handle error
                res.status(404).json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                // send results
                res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // update alert
    updateAlert: (req, res) => {
        // get id from request
        const id = req.params.id;
        const alertsId = parseInt(id, 10);

        // get request body
        const body = req.body;

        // check if id is valid
        if (isNaN(alertsId)) {
            res.status(400).json({
                success: 0,
                message: "Invalid alert id..."
            });
        }

        // update alert
        updateAlert(body, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                res.json({
                    success: 1,
                    message: "Alert updated successfully!"
                });
            }
        });
    },
    // delete alert
    deleteAlert: (req, res) => {
        // get id from request
        const id = req.params.id;

        // delete alert
        deleteAlert(id, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Failed to delete record..."
                });
            } else {
                res.json({
                    success: 1,
                    message: "Alert deleted successfully!"
                });
            }
        });
    }
}