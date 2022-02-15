const router = require("express").Router();
const objId = require("mongoose").Types.ObjectId;
const mentor = require("../models/mentor.js");
const student = require("../models/student.js");

// Route: /assignMentor
// Usage: pass request with mentor id and student array (one or more students)
// {
//     "mentorId":"620b96e6d315df78dc45639e",
//     "studentsArray": ["620b9729d315df78dc4563a0","620b9781d315df78dc4563a4"]
// }
//====================================================
router.post("/assign", async (req, res) => {
  try {
    console.log(req.body);
    //Appending new students to mentor's existing students array
    const mentorDB = await mentor.findById(req.body.mentorId);
    mentorDB.studentsAssigned = [
      ...mentorDB.studentsAssigned,
      ...req.body.studentsArray,
    ];
    mentorDB.save();

    //Updating mentor for new students recieved in request
    req.body.studentsArray.forEach(async (std) => {
      const studentDB = await student.findById(std);
      studentDB.mentorAssigned = req.body.mentorId;
      studentDB.save();
    });
    res.send("Mentor Assigned Successfully!");
  } catch (e) {
    res.status(400).send("system error in assigning mentor: " + e);
    console.log("Error in assigning mentor");
  }
});

// Route: /modifyMentor
// Usage: pass request with student id and new mentor id
// {
//     "studentId": "620b9781d315df78dc4563a4"
//     "mentorId":"620b981cd315df78dc4563aa",
// }
//=========================================================
router.post("/modify", async (req, res) => {
  console.log(req.body);
  try {
    // update student with new mentor given in request
    console.log("inside - update student with new mentor");
    let studentDB = await student.findById(req.body.studentId);
    const oldMentorId = studentDB.mentorAssigned;
    studentDB.mentorAssigned = req.body.mentorId;
    studentDB.save();

    // remove student from old mentor student list
    console.log("inside - remove student from old mentor student list");
    let oldmentor = await mentor.findById(oldMentorId);

    if (oldmentor.studentsAssigned.length < 0) {
      return;
    } else {
      let studentArrayOld = oldmentor.studentsAssigned;
      console.log("Students of old mentor before update: " + studentArrayOld);
      // Get index postion of student to be removed from mentor
      const index = studentArrayOld.indexOf(objId(req.body.studentId));
      if (index > -1) {
        studentArrayOld.splice(index, 1);
      }
      oldmentor.studentsAssigned = studentArrayOld;
      console.log("Students of old mentor after update: " + studentArrayOld);
    }

    oldmentor.save();

    //add the student in new mentor's student list
    console.log("inside - add the student in new mentor's student list");
    let newmentor = await mentor.findById(req.body.mentorId);
    if (newmentor.studentsAssigned.length < 0) {
      return;
    } else {
      if (!newmentor.studentsAssigned.includes(req.body.studentId)) {
        newmentor.studentsAssigned = [
          ...newmentor.studentsAssigned,
          req.body.studentId,
        ];
      }
    }
    newmentor.save();
    res.send("Mentor updated successfully!");
  } catch (e) {
    res.status(500).send("system error in updating the mentor: " + e);
  }
});

module.exports = router;
