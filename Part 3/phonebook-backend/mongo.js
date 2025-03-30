require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

// Connecting to database
mongoose
  .connect(URL)
  .then((ans) => {
    console.log("ConnectedSuccessful");
  })
  .catch((err) => {
    console.log("Error in the Connection");
  });

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    name: String,
    number: String,
  })
);

if (process.argv.length === 2) {
  Person.find({}).then((response) => {
    console.log(response);
    mongoose.connection.close();
  });
} else {
  const name = process.argv[2];
  const number = process.argv[3];
  const newPerson = new Person({ name, number });

  newPerson.save().then((response) => {
    console.log(response);
    mongoose.connection.close();
  });
}
