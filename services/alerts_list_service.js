// import pool
const pool = require("../dao/padosee_dao.js");

// export queries
module.exports = {
    // insert alert
    create: (data, callback) => {
        pool.query(`INSERT INTO alerts_list SET ? WHERE alerts_id = ?`, [data, data.alerts_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    }, 
    // get all alerts
    getAlerts: callback => {
        pool.query('SELECT * FROM alerts_list', [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                 return callback(null, results);
            }
        });
    }, 
    // get alert by id
    getAlertById: (id, callback) => {
        pool.query(`SELECT * FROM alerts_list WHERE alert_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // get alert by user id from user table
    getAlertByUserId: (id, callback) => {
        pool.query(`SELECT * FROM alerts_list INNER JOIN camera_list ON alerts_list.cam_id = camera_list.cam_id INNER JOIN user_list ON camera_list.user_id = user_list.user_id WHERE user_list.user_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // get alerts by primary user id from connections table
    getAlertsByPrimaryUser: (id, callback) => {
        // sql query
        pool.query(`SELECT * FROM alerts_list INNER JOIN connections ON alerts_list.cam_id = connections.camera_id WHERE connections.primary_user = ?`, [id], (error, results, fields) => {
            // check for error
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // update alert
    updateAlert: (data, callback) => {
        pool.query(`UPDATE alerts_list SET ? WHERE alerts_id = ?`, [data, data.alerts_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // delete alert
    deleteAlert: (id, callback) => {
        pool.query(`DELETE FROM alerts_list WHERE alert_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
}