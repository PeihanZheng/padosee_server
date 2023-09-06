// get pool query from service
const { create, getCameras, getCameraById, getCamerasByUserId, getCameraBySenderId, updateCamera, deleteCamera } = require('../services/camera_list_service.js');

// export controller
module.exports = {
    // create camera
    createCamera: (req, res) => {
        // request body
        const body = req.body;

        // create new camera
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ 
                    success: 0,
                    message: "Failed to insert record..." 
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    },
    // get all cameras
    getCameras: (req, res) => {
        // get all cameras
        getCameras((error, results) => {
            if (error) {
                console.log(error);
                return;
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get camera by id
    getCameraById: (req, res) => {
        // access id from request
        const id = req.params.id;

        // get camera by id
        getCameraById(id, (error, results) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get cameras by user id
    getCamerasByUserId: (req, res) => {
        // access id from request
        const id = req.params.id;

        // get camera by user id
        getCamerasByUserId(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Error in getting record..."
                });
            } else if (results.length === 0) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get camera by sender id from requests table
    getCameraBySenderId: (req, res) => {
        // get the id from the request
        const id = req.params.id;

        // get camera by sender id
        getCameraBySenderId(id, (error, results) => {
            if (error) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Error in getting record..."
                });
            } else if (results.length === 0) {
                // handle error
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                // return results
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // update camera
    updateCamera: (req, res) => {
        // request body
        const body = req.body;

        // update camera
        updateCamera(body, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                return res.json({
                    success: 1,
                    message: "Updated successfully..."
                });
            }
        });
    },
    // delete camera
    deleteCamera: (req, res) => {
        // access id from request
        const id = req.params.id;

        // delete camera
        deleteCamera(id, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to delete record..."
                });
            } else {
                return res.json({
                    success: 1,
                    message: "Deleted successfully..."
                });
            }
        });
    }
}
