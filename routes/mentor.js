const express = require("express");
const router = express.Router();
const mentor = require("../models/mentor.js");

// List mentors
// Usage: /
//=========================================
router.get("/", async (req, res) => {
  console.log("inside get all mentors route");
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (e) {
    res.status(400).send("Error in showing mentor list" + e);
  }
});

// Add mentors
// Usage: /add
//=========================================
router.post("/add", async (req, res) => {
  console.log("inside add mentor route");
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      skill: req.body.skill,
    });
    res.send(data);
  } catch (e) {
    res.status(400).send("Error in adding mentor" + e);
  }
});

// Show students of a mentor
// Usage: /:id
//=========================================
router.get("/:id", async (req, res) => {
  console.log("inside get all students of mentor");
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (e) {
    console.log(e, "error");
    res.status(500).send("Error in showing students of the mentor" + e);
  }
});

module.exports = router;
