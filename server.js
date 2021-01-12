const mongoose = require("mongoose");

const Exercise = require("./models")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exerciseDB", { useNewUrlParser: true });

const data = {
  
};

Example.create(data)
  .then(dbExample => {
    console.log(dbExample);
  })
  .catch(({ message }) => {
    console.log(message);
  });
