const mongoose = require("mongoose");
require("dotenv").config();

const MongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("error in connecting to MongoDB" + e);
  }
};

module.exports = {MongoDBConnect};
