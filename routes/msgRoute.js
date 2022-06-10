const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const dataSchema = require("../mongoose/src/data.mongoose");
const dataModel = mongoose.model("MsgFromOther", dataSchema);

router.get("/", async (req, res) => {
  const fetchMsg = await dataModel.find({}).sort("-date");
  res.render("msg", { fetchMsg });
});
module.exports = router;
