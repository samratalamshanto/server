const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();

const dataSchema = require("../mongoose/src/data.mongoose.js");
const dataModel = new mongoose.model("MsgFromOther", dataSchema);
router.get("/create", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});
router.route("/create").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const msg = req.body.msg;
  console.log(req.body);
  const newData = new dataModel({
    name,
    email,
    msg,
  });
  console.log(newData);
  await newData
    .save()
    .then(() => {
      console.log("New user: ", newData);
      res.status(200).json({
        msg: "successful",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was a error. Failed",
      });
    });
});

module.exports = router;

// await newData.save((err) => {
//   if (err) {
//     res.status(500).json({
//       error: "There was a error. Failed",
//     });
//   } else {
//     res.status(200).json({
//       msg: "successful",
//     });
//   }
// });
