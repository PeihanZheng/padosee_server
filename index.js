// import modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user_list_route.js');
const cameraRouter = require('./routes/camera_list_route.js');
const analyticsRouter = require('./routes/analytics_list_route.js');
const alertsRouter = require('./routes/alerts_list_route.js');
const requestsRouter = require('./routes/requests_route.js');
const messagesRouter = require('./routes/messages_route.js');

// import environment variables
dotenv.config();

// define port
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use('/users', userRouter);
app.use('/cameras', cameraRouter);
app.use('/analytics', analyticsRouter);
app.use('/alerts', alertsRouter);
app.use('/requests', requestsRouter);
app.use('/messages', messagesRouter);

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});