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
      user: "samrat.alam.keut@gmail.com",
      pass: process.env.EMAILPASS,
    },
  });

  var mailOutput =
    `  <body>
    <table>
      <tr>
        <td>Name: </td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email: </td>
        <td><strong>${email}</strong></td>
      </tr>
      <tr>
        <td>Message: </td>
        <td><strong>${msg}</strong></td>
      </tr>
    </table>
  </body>
</html>`;

  var mailOptions = {
    from: email,
    to: "samrat.alam.keut@gmail.com",
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
    `
  <html>
    <body>
      <table>
        <tr>
          <td>
            Dear ${name},
          </td>
        </tr>
        <tr>
          <td>
          <br>Thank you for your message. I appreciate you taking the time to reach out to me.<br><br>I will be sure to get back to you as soon as possible. In the meantime, please feel free to let me know if you have any further questions or concerns.<br><br>Thank you again for contacting me.
          </td>
        </tr>
        <tr>
          <td>
            <br>
            Best regards,<br>
            <strong>Samrat Alam</strong><br>
            Software Developer @ Red.Digital Limited<br>
            B.Sc in CSE, KUET<br>
            Mobile: <strong>01674937832,01833183699</strong><br>
            Email: <strong>samratalamshanto710@gmail.com</strong><br>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

  var mailOptions1 = {
    from: "samrat.alam.keut@gmail.com",
    to: email,
    subject: `Message Received !!!`,
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
