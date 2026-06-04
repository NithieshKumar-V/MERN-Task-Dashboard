const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Temporary task array (we'll replace this with MongoDB collection next)
let tasks = [
  "Learn React",
  "Build MERN Project",
  "Push to GitHub",
];

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully",
  });
});

// Get Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add Task
app.post("/tasks", (req, res) => {
  const { task } = req.body;

  tasks.push(task);

  res.json({
    message: "Task added successfully",
    tasks,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});