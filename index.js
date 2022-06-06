require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "https://thriving-blancmange-7a9ed1.netlify.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const port = process.env.PORT || 5000;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const router = require("./routes/router.js");

const url = process.env.MONGOOESURL;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, config)
  .then(() => console.log("Connection Successful!!"))
  .catch((err) => {
    console.log(err);
  });

//connect to routes

app.use("/", router);
app.get("/", (req, res) => {
  res.send("helllooo!! we are in api");
  console.log("Helloo");
});

app.listen(port, () => {
  console.log(`Server is listening @http://localhost:${port}`);
});
