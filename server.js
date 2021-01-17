const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutModel");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

var path=require("path");

// API Routes

//Route for finding most recent workout
app.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(r => {
      res.json(r);
    })
    .catch(err => {
      res.json(err);
    });  
});

//Route for creating a new workout
app.post("/api/workouts", (req, res) => {
  Workout.create({}, (error, c) => {
    if (error) {
      res.send(error);
    } else {
      res.send(c);
    }
  })
});

//Route for adding a new exercise to an existing workout
app.put("/api/workouts/:id",({body,params},res)=>{
  Workout.findByIdAndUpdate(params.id,{$push:{exercises:body}},{runValidators: true})
  .then(w=>(res.json(w)))
});

//Route for finding total duration of last 7 workouts
app.get("/api/workouts/range",(req,res)=>{
  Workout.find({}).limit(7)
  .then(duration=>(workout.workouts.aggregate([
    {
      $addFields:{
        totalDuration: $sum($exercises.duration)
      }
    }
  ])))
  .then(res.json(duration))
});

//Route for finding total weight lifted during last 7 workouts
app.get("/api/workouts/range",(req,res)=>{
  Workout.find({}).limit(7)
  .then(weight=>(workout.workouts.aggregate([
    {
      $addFields:{
        totalWeight: $sum($exercises.weight)
      }
    }
  ])))
  .then(res.json(weight))
});

//HTML Routes

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise?" || "/exercise", (req,res)=>{
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats",(req,res)=>{
  res.sendFile(path.join(__dirname, "./public/stats.html"));

});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});