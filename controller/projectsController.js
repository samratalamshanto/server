const projectDataModel = require("../mongoose/src/projectDataSchema");

async function getProjectOnly(req, res, next) {
  // console.log(projectDataModel.find());
  await projectDataModel
    .find()
    .sort("-date")
    .then((result) => {
      console.log("hola back");
      console.log(result);
      res.json({
        result,
      });
    });

  // res.redirect("/projectsdataonly");
}

async function getProject(req, res, next) {
  const fetchProject = await projectDataModel.find({}).sort("-date");
  res.render("index", { fetchProject });
}

async function postProject(req, res, next) {
  const { project_name, project_link, year } = req.body;
  const newProject = projectDataModel({
    project_name,
    project_link,
    year,
  });

  newProject
    .save()
    .then()
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/moreprojects");
}

async function delProject(req, res, next) {
  await projectDataModel.findByIdAndDelete(req.params.id);
  res.redirect("/moreprojects");
}
module.exports = { postProject, getProject, delProject, getProjectOnly };
