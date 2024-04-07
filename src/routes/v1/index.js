const express = require("express");
const problemRouter = require("./problem.routes");

const v1Routes = express.Router();

v1Routes.use("/problems", problemRouter);

module.exports = v1Routes;
