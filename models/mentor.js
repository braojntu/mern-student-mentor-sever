const mongoose = require("mongoose");
const schema = mongoose.Schema;

const mentorSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  skill: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentor", mentorSchema, "mentor");
module.exports = mentor;
