const logger = require("../config/logger.config");
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
      logger.info(
        `[ProblemRepository.createProblem] Problem created successfully: problemID - ${problem._id}`
      );
      return problem;
    } catch (error) {
      logger.error(
        `[ProblemRepository.createProblem] Error creating problem: ${error}`,
        error
      );
      // console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const allProblems = await Problem.find({});
      logger.info(
        `[ProblemRepository.getAllProblem] Retrieved all problems: ${allProblems.length}`
      );
      return allProblems;
    } catch (error) {
      logger.error(
        `[ProblemRepository.getAllProblem] Error retrieving all problems: ${error}`
      );
      console.log(error);
      throw error;
    }
  }

  async getProblem(problemID) {
    try {
      const problem = await Problem.findById(problemID);
      if (!problem) {
        logger.error(
          `[ProblemRepository.getProblem] Problem with id: ${problemID} not found in the db`
        );
        throw new NotFound("Problem", problemID);
      }
      logger.info(
        `[ProblemRepository.getProblem] Problem with id: ${problemID} found in the db`
      );
      return problem;
    } catch (error) {
      logger.error(
        `[ProblemRepository.getProblem] Error while getting a problem with ID [${problemID}] \n${error}`,
        error
      );
      // console.log(error);
      throw error;
    }
  }

  async deleteProblem(problemID) {
    try {
      const deletedProblem = await Problem.findByIdAndDelete(problemID);
      if (!deletedProblem) {
        logger.error(
          `[ProblemRepository.deleteProblem] Problem with id: ${problemID} not found in the db`
        );
        throw new NotFound("Problem", problemID);
      }
      logger.info(
        `[ProblemRepository.deleteProblem] Deleted problem with ID: ${problemID}`
      );
      return deletedProblem;
    } catch (error) {
      logger.error(
        `[ProblemRepository.deleteProblem] Error deleting a problem with ID [${problemID}] \n${error}`,
        error
      );
      // console.log(error);
      throw error;
    }
  }

  async updateProblem(problemID, updateData) {
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        problemID,
        updateData,
        { new: true }
      );
      if (!updatedProblem) {
        logger.error(
          `[ProblemRepository.updateProblem] Problem not found with ID: ${problemID}`
        );
        throw new NotFound("Problem", problemID);
      }
      logger.info(
        `[ProblemRepository.updateProblem] Updated problem with ID: ${problemID}`
      );
      return updatedProblem;
    } catch (error) {
      logger.error(
        `[ProblemRepository.updateProblem] Error while updating a problem with ID [${problemID}] \n${error}`,
        error
      );
      // console.log(error);
      throw error;
    }
  }
}

module.exports = ProblemRepository;
