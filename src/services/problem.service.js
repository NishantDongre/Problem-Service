const sanitizeMarkdownContent = require("../utils/markdownSanitizer");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData) {
    // 1. Sanitize the markdown for description
    problemData.description = sanitizeMarkdownContent(problemData.description);

    //   console.log("Problem data", problemData);
    const problem = await this.problemRepository.createProblem(problemData);
    //   console.log("Problem created", problem);

    return problem;
  }

  async getAllProblems() {
    const allProblems = await this.problemRepository.getAllProblems();
    return allProblems;
  }

  async getProblem(problemID) {
    const problem = await this.problemRepository.getProblem(problemID);
    return problem;
  }

  async deleteProblem(problemID) {
    const deletedProblem = await this.problemRepository.deleteProblem(
      problemID
    );
    return deletedProblem;
  }

  async updateProblem(problemID, updateData) {
    const updatedProblem = await this.problemRepository.updateProblem(
      problemID,
      updateData
    );
    return updatedProblem;
  }
}

module.exports = ProblemService;
