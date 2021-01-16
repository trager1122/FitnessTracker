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

// API Routes
app.get("/exercise", (req, res) => {
  Workout.find({})
    .then(all => {
      res.json(all);
    })
    .catch(err => {
      res.json(err);
    });  
});

app.post("/api/workouts", (req, res) => {

  Workout.create({}, (error, created) => {
    if (error) {
      res.send(error);
    } else {
      res.send(created);
    }
  })
});

app.put("/api/workouts/:id",({body,params},res)=>{
  Workout.findByIdAndUpdate(params.id,{$push:{exercises:body}},{runValidators: true})
  .then(w=>(res.json(w)))
});

app.get("/stats",(req,res)=>{
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

app.get("/stats",(req,res)=>{
  Workout.find({}).limit(7)
  .then(weight=>(db.workouts.aggregate([
    {
      $addFields:{
        totalWeight: $sum($exercises.weight)
      }
    }
  ])))
  .then(res.json(weight))
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});