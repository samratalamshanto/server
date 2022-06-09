const express = require("express");
const router = express.Router();

const {
  postProject,
  getProject,
  delProject,
} = require("../controller/projectsController");
router.get("/", getProject);
router.post("/", postProject);

router.get("/:id/delete", delProject);
module.exports = router;
