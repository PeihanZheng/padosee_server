const pool = require("../dao/padosee_dao.js");
const fs = require("fs");
const path = require("path");

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
    // method to verify user password
    verifyPassword: (email, password, callback) => {
        pool.query("SELECT * FROM user_list WHERE email_address = ?", [email], (error, results, fields) => {
            if (error) {
                return callback(error);
            } 
            if (results.length === 0) {
                return callback(null, false); // user not found
            }

            // compare the password
            const user = results[0];
            console.log(user);
            if (user.user_password === password) {
                return callback(null, user);
            } else {
                return callback(null, false);
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
