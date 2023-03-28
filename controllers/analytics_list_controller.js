// get pool query from service
const { create, getAnalytics, getAnalyticsById, updateAnalytics, deleteAnalytics } = require('../services/analytics_list_service.js');

// export controller
module.exports = {
    // create analytics
    createAnalytics: (req, res) => {
        // request body
        const body = req.body;

        // create new analytics
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
            }
        });
    },
    // get all analytics
    getAnalytics: (req, res) => {
        // get all analytics
        getAnalytics((error, results) => {
            if (error) {
                console.log(error);
                return;
            } else {
                res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get analytics by id
    getAnalyticsById: (req, res) => {
        // access id from request
        const id = req.params.id;

        // get analytics by id
        getAnalyticsById(id, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // update analytics
    updateAnalytics: (req, res) => {
        // request body
        const body = req.body;

        // update analytics
        updateAnalytics(body, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                res.json({
                    success: 1,
                    message: "Record updated successfully..."
                });
            }
        });
    },
    // delete analytics
    deleteAnalytics: (req, res) => {
        // access id from request
        const id = req.params.id;

        // delete analytics
        deleteAnalytics(id, (error, results) => {
            if (error) {
                console.log(error);
                res.json({
                    success: 0,
                    message: "Failed to delete record..."
                });
            } else {
                res.json({
                    success: 1,
                    message: "Record deleted successfully..."
                });
            }
        });
    }
}