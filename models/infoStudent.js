const Student = require('./studentModel');

// Function to get all students
const getAllStudents = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (error) {
        throw new Error('Error fetching students: ' + error.message);
    }
};

// Function to get a student by ID
const getStudentById = async (id) => {
    try {
        const student = await Student.findById(id);
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    } catch (error) {
        throw new Error('Error fetching student: ' + error.message);
    }
};

module.exports = {
    getAllStudents,
    getStudentById
};
