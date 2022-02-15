const express = require("express");
const router = express.Router();
const student = require("../models/student.js");

// Get all Students
router.get("/", async (req, res) => {
  console.log("inside get all Students route");
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send("Error in getting the students: " + e);
  }
});

// Add student
router.post("/add", async (req, res) => {
  console.log("inside add Student route");
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    res.status(500).send("Error in adding student: " + e);
  }
});

module.exports = router;
