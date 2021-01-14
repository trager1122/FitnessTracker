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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise/api/workouts", ({ body }, res) => {
  const ex = body;

  db.workouts.find(ex, (error, last) => {
      if (error) {
        res.send(error);
      } else {
        res.send(last);
      }
  });
});;

app.post("/exercise/api/workouts", ({ body }, res) => {
  const ex = body;

  db.workouts.insert(ex, (error, created) => {
    if (error) {
      res.send(error);
    } else {
      res.send(created);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});