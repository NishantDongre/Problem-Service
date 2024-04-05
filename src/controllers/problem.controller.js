function pingProblemController(req, res) {
  res.json({ message: "Problem Controller is up!" });
}

function addProblem(req, res) {}

function getProblem(req, res) {}

function getProblems(req, res) {}

function deleteProblem(req, res) {}

function updateProblem(req, res) {}

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  pingProblemController,
};
