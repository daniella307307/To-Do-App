const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

// Configure CORS to allow only specific origins
const corsOptions = {
    origin: '*',  // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Allow these headers
};

app.use(cors(corsOptions));  // Use the CORS options in the middleware
app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1/tasks', taskRouter);

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
