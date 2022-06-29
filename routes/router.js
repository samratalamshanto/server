require("dotenv").config();
const express = require("express");
var nodemailer = require("nodemailer");
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
  const { name, email, msg } = req.body;

  //Email---------

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samratalamshanto710@gmail.com",
      pass: process.env.EMAILPASS,
    },
  });

  var mailOptions = {
    from: email,
    to: "samratalamshanto710@gmail.com",
    subject: `Sending Email from ${name}!!!!`,
    text: msg,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  //-----------------

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
