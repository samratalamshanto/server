const express = require("express");
const { getProjectOnly } = require("../controller/projectsController");
const router = express.Router();

router.get("/", getProjectOnly);

module.exports = router;
