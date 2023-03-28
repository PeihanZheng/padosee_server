// import dao
const pool = require("../dao/padosee_dao.js");

// export queries
module.exports = {
    // insert analytics
    create: (data, callback) => {
        pool.query(`INSERT INTO analytics_list SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get all analytics
    getAnalytics: callback => {
        pool.query('SELECT * FROM analytics_list', [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get analytics by id
    getAnalyticsById: (id, callback) => {
        pool.query(`SELECT * FROM analytics_list WHERE analytics_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // update analytics
    updateAnalytics: (data, callback) => {
        pool.query(`UPDATE analytics_list SET ? WHERE analytics_id = ?`, [data, data.analytics_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // delete analytics
    deleteAnalytics: (id, callback) => {
        pool.query(`DELETE FROM analytics_list WHERE analytics_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }
}