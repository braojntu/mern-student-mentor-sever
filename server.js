const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const assignMentorRoute = require("./routes/assignmentor");
const {MongoDBConnect} = require("./config/db");

const app = express();
const port = process.env.PORT;
app.use(cors());

// For converting non-html data into JSON
app.use(express.json());

// For converting html form data into JSON
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.send("Student Mentor Server : Default Route");
});
app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", assignMentorRoute);

app.listen(port, async (err) => {
  await MongoDBConnect();
  console.log("Express Server Running on Port: " + port);
  if (err) {
    console.log(err, "Error in starting Express server");
  }
});
