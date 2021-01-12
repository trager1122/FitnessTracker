const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  reps: {
    type: Number,
    required: true
  },

  weight: {
    type: Number,
    required: true
  },

  sets: {
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

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;