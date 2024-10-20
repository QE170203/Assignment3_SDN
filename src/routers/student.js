const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// POST /students
router.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create student',
            error: error.message
        }
        )
    }
});

// GET /students
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong on the server',
            error: error.message
        });
    }
});

// GET /students/:id
router.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res
                .status(404)
                .json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong on the server',
            error: error.message
        });
    }
});
// PUT /students/:id
router.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!student)
            return res
                .status(404)
                .json({ success: false, message: "Student not found" });
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update student',
            error: error.message
        });
    }
});

// DELETE /students/:id
router.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student)
            return res
                .status(404)
                .json({ success: false, message: "Student not found" });
        res
            .status(200)
            .json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong on the server',
            error: error.message
        });
    }
});


module.exports = router;