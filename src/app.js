const express = require("express");
const Student = require("./models/Student");

const app = express();

// middleware
app.use(express.json());

// Routes

// Get all the students
app.get("/students", async (req, res) => {
  // write your codes here
  res.send(await Student.find({ isDeleted: false }));
});

// Add student to database
app.post("/students", async (req, res) => {
  // write your codes here
  const body = req.body;
  const newStudent = Student(body);
  await newStudent.save();
  res.send(newStudent);
});

// Get specific student
app.get("/students/:id", async (req, res) => {
  // write your codes here
  try {
    const result = await Student.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (result != null && result != undefined) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  }
  catch(er){
      res.sendStatus(404);
  }
});

// delete specific student
app.delete("/students/:id", async (req, res) => {
  // write your codes
  if (req.query.type.toLowerCase() === "soft") {
    await Student.updateOne({ _id: req.params.id }, { isDeleted: true });
  } else if (req.query.type.toLowerCase() === "hard") {
    await Student.deleteOne({ _id: req.params.id });
  }
  res.sendStatus(200);
});

module.exports = app;
