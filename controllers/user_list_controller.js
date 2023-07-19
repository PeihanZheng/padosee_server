const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require('../services/user_list_service.js');
const { sign } = require("jsonwebtoken");
const expire = 43200;

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
                return res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    updateUser: (req, res) => {
        // request body
        const body = req.body;

        // update user
        updateUser(body, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: 0,
                    message: "Failed to update record..."
                });
            } else {
                return res.json({
                    success: 1,
                    message: "User updated successfully!"
                });
            }
        });
    },
    // method to update user password
    updateUserPassword: (req, res) => {
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
                })
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
                                // update user password
                                updateUser(user_id, { user_password: new_password }, (error, results) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).json({
                                            success: 0,
                                            message: "Failed to update password..."
                                        });
                                    } else {
                                        res.status(200).json({
                                            success: 1,
                                            message: "Password updated successfully!"
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
            } 
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found..."
                });
            }
            return res.json({
                success: 1, 
                message: "User deleted successfully!"
            });
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
            
            // compare password
            if (body.password === results.user_password) {
                results.user_password = undefined;
                const jsonToken = sign({ result: results }, process.env.JSON_TOKEN, {
                    expiresIn: expire
                });
                return res.json({
                    success: 1, 
                    message: "Login successful!",
                    accessToken: jsonToken,
                    user: results
                });
            }
        });
    }
};
