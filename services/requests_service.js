// import pool
const pool = require('../dao/padosee_dao');

// export queries
module.exports = {
    // insert request
    create: (data, callback) => {
        pool.query(`INSERT INTO requests SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get all requests
    getRequests: (callback) => {
        pool.query(`SELECT * FROM requests`, [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    }, 
    // get requests by id
    getRequestById: (id, callback) => {
        pool.query(`SELECT * FROM requests WHERE request_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }, 
    // get request by sender id
    getRequestsBySenderId: (id, callback) => {
        pool.query(`SELECT * FROM requests WHERE sender_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get request by receiver id
    getRequestsByReceiverId: (id, callback) => {
        pool.query(`SELECT * FROM requests WHERE receiver_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // update request
    updateRequest: (id, data, callback) => {
        pool.query(`UPDATE requests SET ? WHERE request_id = ?`, [data, id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    }, 
    // delete request
    deleteRequest: (id, callback) => {
        pool.query(`DELETE FROM requests WHERE request_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }
}
