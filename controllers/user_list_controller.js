const { create, getUsers, getUserById, updateUser, verifyPassword, deleteUser, getUserByEmail,getUserByPhone ,getPhoneNumbers} = require('../services/user_list_service.js');
const { sign } = require("jsonwebtoken");
const expire = 43200;
const multer = require("multer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail, Yahoo
    auth: {
        user: 'chittebabu@graymatics.com',
        pass: 'Chittebabu@21'
    }
});

module.exports = {
    createUser: (req, res) => {
        // request body
        const body = req.body;

        // create new user
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to insert record...."
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    },
    getUsers: (req, res) => {
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to get records..."
                })
                return;
            } else {
                return res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                console.log(results);
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get user by email
    getUserByEmail: (req, res) => {
        // get email from params
        const email = req.params.email;

        // get user by email
        getUserByEmail(email, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to get user..."
                });
            } else if (!results) {
                res.status(400).json({
                    success: 0,
                    message: "User not found..."
                });
            } else {
                res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // get user by phone number
    getUserByPhone: (req, res) => {
        // get phone number from params
        const phone = req.params.phone;

        // use service to get user by phone number
        getUserByPhone(phone, (error, results) => {
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to get user..."
                });
            } else if (!results) {
                // user not found
                return res.status(400).json({
                    success: 0,
                    message: "User not found..."
                });
            } else {
                // user found
                return res.status(200).json({
                    success: 1,
                    user: results
                });
            }
        });
    },
    // get all phone numbers
    getAllPhoneNumbers: (req, res) => {
        // use service to get all phone numbers
        getPhoneNumbers((error, results) => {
            if (error) {
                // error handling
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Failed to get phone numbers..."
                });
            } else if (results.length === 0) {
                // phone numbers not found
                return res.status(400).json({
                    success: 0,
                    message: "Phone numbers not found..."
                });
            } else {
                console.log(`Results: ${results}`);
                // return the results
                return res.status(200).json({
                    success: 1, 
                    data: results
                });
            }
        });
    },
    updateUser: (req, res) => {
        // user id
        const user_id = req.params.id;
        // request body
        const body = req.body
        if (body.constructor === Object && Object.keys(body).length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Request body is missing..."
            });
        }

        // convert user id to integer
        console.log(typeof(user_id));
        const userId = parseInt(user_id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({
                success: 0,
                message: "Invalid user id..."
            })
        }

        updateUser(userId,body, (error, results) => {
            if (error) {
                // error handling
                console.error(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                // return success message
                return res.status(200).json({
                    success: 1,
                    message: "Record updated successfully!"
                });
            }
        });
    },
    // method to update user password
    updateUserPassword: async (req, res) => {
        // get user id from params
        const user_id = req.params.id;

        // get request body
        const { email_address, user_password, new_password } = req.body;

        // check if request body is empty
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Request body is missing..."
            });
        }

        // verify that user exists with email address
        getUserByEmail(email_address, (error, results) => {
            if (error) {
                // error handling
                console.error(error);
                res.status(500).json({
                    success: 0,
                    message: "Error in sending request..."
                });
            } else {
                // check if user exists
                if (!results) {
                    return res.status(400).json({
                        success: 0,
                        message: "User does not exist..."
                    });
                } else {
                    // verify password
                    verifyPassword(email_address, user_password, (error, results) => {
                        if (error) {
                            console.error(error);
                            res.status(500).json({
                                success: 0,
                                message: "Error in password verification..."
                            });
                        } else {
                            if (!results) {
                                res.status(400).json({
                                    success: 0,
                                    message: "Invalid password..."
                                });
                            } else {
                                // hash the new password
                                bcrypt.hash(new_password, 10, (error, hash) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).json({
                                            success: 0,
                                            message: "Failed to hash password..."
                                        });
                                    } else {
                                        // update user password
                                        updateUser(user_id, { user_password: hash }, (error, results) => {
                                            if (error) {
                                                console.error(error);
                                                res.status(500).json({
                                                    success: 0,
                                                    message: "Failed to update password..."
                                                });
                                            } else {
                                                // return success message
                                                res.status(200).json({
                                                    success: 1,
                                                    message: "Password updated successfully!"
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to delete record..."
                });
            } else {
                return res.json({
                    success: 1, 
                    message: "User deleted successfully!"
                });
            }
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email_address, (error, results) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Unable to login at the moment..."
                });
            } 
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password..."
                });
            }

            // decrypt password and compare using bcrypt
            bcrypt.compare(body.user_password, results.user_password, (error, passwordMatch) => {
                if (error) {
                    console.error(error);
                    return res.status(401).json({
                        success: 0,
                        message: "Unable to login at the moment..."
                    });
                }

                // if successful, return json web token
                if (passwordMatch) {
                    // remove the hashed password from the results
                    results.user_password = undefined;

                    // create json web token
                    const jsonWebToken = sign({ user: results }, process.env.JWT_KEY, {
                        expiresIn: '4h'
                    }); 

                    // return success message
                    return res.status(200).json({
                        success: 1,
                        message: "Login successful!",
                        token: jsonWebToken,
                        user: results
                    });
                } else {
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid email or password..."
                    });
                }
            });
        });
    },

    getUsersByEmail: (req, res) => {
        const email = req.body.email;
        const user_id = req.body.user_id;
        getUsersBygetUsersWithRequestStatusEmail(user_id,email, (error, results) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Record not found..."
                });
            } else {
                return res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    getUsersWithRequestStatus: (req, res) => {
        const user_id = req.query.user_id; 
        getUsersWithRequestStatus(user_id,(error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to get records..."
                })
                return;
            } else {
                return res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    // method to send reset password link to user email
    sendResetPasswordLink: (req, res) => {
        // get user email address from request body
        const { email_address } = req.body;
      
        // check if email address is empty
        if (email_address === "") {
            return res.status(400).json({
                success: 0,
                message: "Email address is required..."
            });
        }

        // check if user exists
        getUserByEmail(email_address, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Error in sending request..."
                });
            } else {
                // check if user exists
                if (!results) {
                    return res.status(400).json({
                        success: 0,
                        message: "User does not exist..."
                    });
                } else {
                    // generate reset password token
                    const resetPasswordToken = crypto.randomBytes(20).toString('hex');

                    // update user record with reset password token
                    updateUser(results.user_id, { reset_password_token: resetPasswordToken }, async (error, results) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({
                                success: 0,
                                message: "Error in sending request..."
                            });
                        } else {
                            // send reset password link to user email
                            const resetPasswordLink = `padosee/reset-password/${resetPasswordToken}`;
                            const message = `
                                <h1>Reset Password</h1>
                                <p>Click on the link below to reset your password</p>
                                <a href="${resetPasswordLink}">${resetPasswordLink}</a>
                            `;
                            try {
                                const mailResult =await transporter.sendMail({to:email_address, subject:"Reset Password", raw:message,from:'chittebabu@graymatics.com'});
                                console.log(mailResult);
                            } catch (error) {
                                console.log(error);
                            }
                         
                            // return success message
                            return res.status(200).json({
                                success: 1,
                                message: "Reset password link sent successfully!"
                            });
                        }
                    });
                }
            }
        });
    }
};
