const pool = require("../dao/padosee_dao.js");
const bcrypt = require("bcrypt");

module.exports = {
    create: (data, callback) => {
        pool.query("SELECT * FROM user_list WHERE email_address = ?", [data.email_address], (error, results, fields) => {
            if (error) {
                callback(error);
            } else if(results.length > 0) {
                const error = {}
                error.userFound = true
                callback(error);
            } else {
                pool.query(`SELECT * FROM user_list WHERE phone = ?`, [data.phone], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    } else if(results.length > 0) {
                        const error = {}
                        error.phoneFound = true
                        callback(error);
                    } else {                        
                        // hash the password
                        bcrypt.hash(data.user_password, 10, (error, hash) => {
                            if (error) {
                                callback(error);
                            } else {
                                if(hash) {
                                    // replace the password with the hash
                                    data.user_password = hash;

                                    // sql query to insert data into user_list table
                                    pool.query(`INSERT INTO user_list SET ?`, [data], (error, results, fields) => {
                                        if (error) {
                                            callback(error);
                                        } else {
                                            callback(null, results);
                                        }
                                    });
                                }
                            }
                        });    
                    }
                })
            }
        })   
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
    }
};
