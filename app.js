require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const studentRouter = require('./src/routers/student');  // Assuming you have a route file for students

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(studentRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
