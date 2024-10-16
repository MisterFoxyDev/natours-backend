const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log("Connected to database!"));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
