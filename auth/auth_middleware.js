// import verify from json web token
const { verify } = require('jsonwebtoken');

// export module 
module.exports = (req, res, next) => {
    // get token from header
    const token = req.headers.authorization.split(" ")[1];

    // check if token exists
    if (!token) {
        return res.status(401).json({
            success: 0,
            message: "Access denied!"
        });
    }

    // verify token
    try {
        // decode token
        const decoded = verify(token, process.env.JWT_KEY);
        console.log(decoded.user);

        // add user data to request
        req.data = decoded.user;

        // next middleware
        next();
    } catch (error) {
        // catch error
        console.log(error);
        return res.status(401).json({
            success: 0,
            message: "Invalid token!"
        });
    }
}