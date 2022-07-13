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
  console.log(req.body);
  const { name, email, msg } = req.body;

  //Email---------

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alam1607022@stud.kuet.ac.bd",
      pass: process.env.EMAILPASS,
    },
  });

  var mailOutput =
    "<html>\n\
                        <body>\n\
                        <table>\n\
                        <tr>\n\
                        <td>Name: </td>" +
    name +
    "<td></td>\n\
                        </tr>\n\
                        <tr>\n\
                        <td>Email: </td><td>" +
    email +
    "</td>\n\
                        </tr>\n\
                        <tr>\n\
                        <td>Message: </td>" +
    msg +
    "<td></td>\n\
                        </tr>\n\
                        </table></body></html>";

  var mailOptions = {
    from: email,
    to: "alam1607022@stud.kuet.ac.bd",
    subject: `Sending Email from ${name}!!!!`,
    html: mailOutput,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  var mailOutput1 =
    "<html>\n\
  <body>\n\
  <table>\n\
  <tr>\n\
  Hello " +
    name +
    ",<td></td>\n\
  </tr>\n\
  <tr>\n\
  <td>Thanks for your message. I will respond to your message shortly. I'll get back to you. Thank You.</td><td>" +
    "</td>\n\
  </tr>\n \n \n\
  <tr>\n \n \n  Best Regards," +
    "<td></td>\n\
  </tr>\n\
  <tr>\n\
Samrat Alam " +
    "<td></td>\n\
    <tr>\n\
B.Sc in CSE, KUET " +
    "<td></td>\n\
    <tr>\n\
Mobile: 01674937832" +
    "<td></td>\n\
    <tr>\n\
Mail: samratalamshanto710@gmail.com" +
    "<td></td>\n\
  </table></body></html>";

  var mailOptions1 = {
    from: "alam1607022@stud.kuet.ac.bd",
    to: email,
    subject: `Message Received !!!!`,
    html: mailOutput1,
  };

  transporter.sendMail(mailOptions1, function (error, info) {
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
