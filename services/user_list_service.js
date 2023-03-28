const pool = require("../dao/padosee_dao.js");

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO user_list SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    getUsers: callback => {
        pool.query("SELECT * FROM user_list", [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        })
    },
    getUserById: (id, callback) => {
        pool.query("SELECT * FROM user_list WHERE user_id = ?", [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    updateUser: (data, callback) => {
        pool.query("UPDATE user_list SET ? WHERE user_id = ?", [data, data.user_id], (error, results, fields) => { 
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    deleteUser: (id, callback) => {
        pool.query("DELETE FROM user_list WHERE user_id = ?", [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        })
    },
    getUserByEmail: (email, callback) => {
        pool.query("SELECT * FROM user_list WHERE email_address = ?", [email], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        })
    }
};