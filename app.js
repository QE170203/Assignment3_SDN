const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const { getAllStudents } = require('./models/infoStudent');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('Could not connect to MongoDB:', err);
            console.log('Retrying MongoDB connection in 3 seconds...');
            setTimeout(connectWithRetry, 3000);
        });
};

connectWithRetry();


app.get('/info', async (req, res) => {
    try {
        const students = await getAllStudents();

        // Filter to return only fullName and studentCode
        const studentInfo = students.map(student => ({
            name: student.name,
            studentCode: student.studentCode
        }));

        res.json({
            data: studentInfo
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching student data: ' + error.message });
    }
});

app.use('/students', studentRoutes);

module.exports = app;
