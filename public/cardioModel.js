const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardioSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  distance: {
    type: Number,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }

});

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;