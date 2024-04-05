const express = require("express");
const ProblemRouter = require("./problem.routes");

const v1Routes = express.Router();

v1Routes.use("/problems", ProblemRouter);

module.exports = v1Routes;
