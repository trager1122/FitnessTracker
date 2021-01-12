const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    required: "String is Required"
  },
  name: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  duration: {
    type: Number
  },

  weight: {
    type: Number
  },

  reps: {
    type: Number
  },

  sets: {
    type: Number
  },

  distance: {
    type: Number
  },
  
  date: {
    type: Date,
    default: Date.now
  },

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;