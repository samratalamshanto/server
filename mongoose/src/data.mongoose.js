const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  msg: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = dataSchema;
