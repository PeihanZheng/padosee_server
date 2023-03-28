// import pool
const pool = require("../dao/padosee_dao.js");

// export queries
module.exports = {
    // insert alert
    create: (data, callback) => {
        pool.query(`INSERT INTO alerts_list SET ?`, [data], (error, results, fields) => {
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
    // update alert
    updateAlert: (data, callback) => {
        pool.query(`UPDATE alerts_list SET ? WHERE alert_id = ?`, [data, data.alert_id], (error, results, fields) => {
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