const { StatusCodes } = require("http-status-codes");
const NotImplemented = require("../errors/notImplemented.error");
function pingProblemController(req, res) {
  return res
    .status(StatusCodes.OK)
    .json({ message: "Problem Server is up and running" });
}

function addProblem(req, res, next) {
  try {
    throw new NotImplemented("Add Problem");
  } catch (error) {
    next(error);
  }
}

function getProblem(req, res, next) {
  try {
    throw new NotImplemented("Get Problem");
  } catch (error) {
    next(error);
  }
}

function getProblems(req, res, next) {
  try {
    throw new NotImplemented("Get Problems");
  } catch (error) {
    next(error);
  }
}

function deleteProblem(req, res, next) {
  try {
    throw new NotImplemented("Delete Problem");
  } catch (error) {
    next(error);
  }
}

function updateProblem(req, res, next) {
  try {
    throw new NotImplemented("Update Problem");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  pingProblemController,
};
