// get pool query from service
const { create, getAlerts, getAlertById, updateAlert, deleteAlert } = require('../services/alerts_list_service.js');

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
                })
            }
        })
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
                })
            }
        })
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
    // update alert
    updateAlert: (req, res) => {
        // get request body
        const body = req.body;

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