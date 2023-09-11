// import dao
const pool = require("../dao/padosee_dao.js");

// export queries
module.exports = {
    // insert camera
    create: (data, callback) => {
        pool.query(`INSERT INTO camera_list SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get all cameras
    getCameras: callback => {
        pool.query(`SELECT * FROM camera_list`, [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get camera by id
    getCameraById: (id, callback) => {
        pool.query(`SELECT * FROM camera_list WHERE cam_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
     // get camera by id
    getCameraByUserId: (id, callback) => {
        pool.query(`SELECT * FROM camera_list WHERE user_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // update camera
    updateCamera: (data, callback) => {
        pool.query(`UPDATE camera_list SET ? WHERE cam_id = ?`, [data, data.cam_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        })
    },
    // delete camera
    deleteCamera: (id, callback) => {
        pool.query(`DELETE FROM camera_list WHERE cam_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },getCameraByLocation: (id,location, callback) => {
        pool.query(`SELECT * FROM camera_list WHERE user_id = ? and cam_location = ?`, [id,location], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
}
