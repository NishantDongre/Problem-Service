const NotFound = require("../errors/notFound.error");
const { Problem } = require("../models");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const allProblems = await Problem.find({});
      return allProblems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProblem(problemID) {
    const problem = await Problem.findById(problemID);
    if (!problem) {
      console.log("inside getProblem but not found");
      throw new NotFound("Problem", problemID);
    }
    return problem;
  }

  async deleteProblem(problemID) {
    const deletedProblem = await Problem.findByIdAndDelete(problemID);
    if (!deletedProblem) {
      throw new NotFound("Problem", problemID);
    }
    return deletedProblem;
  }

  async updateProblem(problemID, updateData) {
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemID,
      updateData,
      { new: true }
    );
    if (!updatedProblem) {
      throw new NotFound("Problem", problemID);
    }
    return updatedProblem;
  }
}

module.exports = ProblemRepository;
