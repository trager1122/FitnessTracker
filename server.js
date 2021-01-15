const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Ex = require("./models/workoutModel");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", { useNewUrlParser: true });

// API Routes
app.get("/api/workouts", (req, res) => {
  Workout.findOne().sort({ field: 'asc', day: -1 }).limit(1), (error,last)=> {
      if (error) {
        console.log(error);
      } else {
        res.json(last);
      }
  }
});

app.post("/api/workouts", ({ body }, res) => {
  const ex = body;

  Workout.insert(ex, (error, created) => {
    if (error) {
      res.send(error);
    } else {
      res.send(created);
    }
});

  // HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});