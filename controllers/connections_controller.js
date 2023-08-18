// import service modules
const { create, getConnections, getConnectionsById, getConnectionsByCameraId, updateConnection, deleteConnection } = require('../services/connections_service.js');

// export controller
module.exports = {
    // create connection
    createConnection: (req, res) => {
        // get request body
        const body = req.body;

        // create new connection
        create(body, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to insert record..."
                });
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    },
    // get all connections
    getConnections: (req, res) => {
        // get all connections
        getConnections((error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return;
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get connection by id
    getConnectionById: (req, res) => {
        // access id from request
        const id = req.params.id;

        // get connection by id
        getConnectionById(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get connections by camera id
    getConnectionsByCameraId: (req, res) => {
        // access id from request
        const id = req.params.id;

        // get connections by camera id
        getConnectionsByCameraId(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return;
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // update connection
    updateConnection: (req, res) => {
        // get request body
        const body = req.body;

        // update connection
        updateConnection(body, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    },
    // delete connection
    deleteConnection: (req, res) => {
        // access id from request
        const id = req.params.id;

        // delete connection
        deleteConnection(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to delete record..."
                });
            } else {
                // return success
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    }
}