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
  Workout.findAll(req, (error,all)=> {
      if (error) {
        console.log(error);
      } else {
        res.json(all);
      }
  })
});

app.post("/api/workouts", (req, res) => {

  Workout.create({}, (error, created) => {
    if (error) {
      res.send(error);
    } else {
      res.send(created);
    }
});

app.put("/api/workouts/:id",({body,params},res)=>{
  Workout.findByIdAndUpdate(params.id,{$push:{exercises:body}},{runValidators: true})
  .then(workout=>(res.json(workout)))
});

app.get("/api/workouts/range",(req,res)=>{
  Workout.find({}).limit(7)
  .then(duration=>(db.workouts.aggregate([
    {
      $addFields:{
        totalDuration: $sum($exercises.duration)
      }
    }
  ])))
  .then(res.json(duration))
});

app.get("/api/workouts/range",(req,res)=>{
  Workout.find({}).limit(7)
  .then(duration=>(db.workouts.aggregate([
    {
      $addFields:{
        totalWeight: $sum($exercises.weight)
      }
    }
  ])))
  .then(res.json(duration))
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});