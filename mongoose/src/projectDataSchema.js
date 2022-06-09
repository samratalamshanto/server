const mongoose = require("mongoose");
const projectData = mongoose.Schema({
  project_name: {
    type: String,
  },
  project_link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model("project", projectData);
