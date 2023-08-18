// import dao
const pool = require('../dao/padosee_dao.js');

// export queries
module.exports = {
    // create new connection
    create: (data, callback) => {
        pool.query(`INSERT INTO connections SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get all connections
    getConnections: (callback) => {
        pool.query(`SELECT * FROM connections`, (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get connection by id
    getConnectionById: (id, callback) => {
        pool.query(`SELECT * FROM connections WHERE connect_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // get connections by camera id
    getConnectionsByCameraId: (id, callback) => {
        pool.query(`SELECT * FROM connections WHERE camera_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // update connection
    updateConnection: (data, callback) => {
        pool.query(`UPDATE connections SET ? WHERE connect_id = ?`, [data, data.connect_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // delete connection
    deleteConnection: (id, callback) => {
        pool.query(`DELETE FROM connections WHERE connect_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }
}