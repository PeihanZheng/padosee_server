const pool = require("../dao/padosee_dao.js");
const bcrypt = require("bcrypt");

module.exports = {
    create: (data, callback) => {
            // sql query to insert data into user_list table
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
    // get user by phone number
    getUserByPhone: (phone, callback) => {
        // sql query to get user by phone number
        pool.query(`SELECT * FROM user_list WHERE phone = ?`, [phone], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // get all phone numbers
    getPhoneNumbers: callback => {
        // sql query to get all phone numbers
        pool.query("SELECT phone FROM user_list", [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                console.log(results);
                return callback(null, results);
            }
        });
    },
    updateUser: (user_id,data, callback) => {
        pool.query("UPDATE user_list SET ? WHERE user_id = ?", [data,user_id], (error, results, fields) => { 
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
            bcrypt.compare(password, user.user_password, (error, passwordMatch) => {
                if (error) {
                    console.error(error);
                    return callback(error);
                } else {
                    return callback(null, passwordMatch);
                }
            });
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
    },
    getUsersByEmail: (user_id,email, callback) => {
        pool.query("SELECT  DISTINCT * FROM user_list u LEFT JOIN (select * from requests where sender_id = ?) as rq ON u.user_id=rq.receiver_id WHERE u.email_address = ?", [user_id,email], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        })
    },
    getUsersWithRequestStatus: (user_id, callback) => {
        pool.query("SELECT  DISTINCT * FROM user_list u LEFT JOIN (select * from requests where sender_id = ?) as rq ON u.user_id=rq.receiver_id ", [user_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        })
    }
};
