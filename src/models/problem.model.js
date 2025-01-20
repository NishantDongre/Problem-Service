const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"],
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"],
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: [true, "Difficulty cannot be empty"],
        default: "easy",
    },
    timeLimit: { // in Milliseconds
        type: Number,
        required: [true, "Code Execution Time Limit is required"]
    },
    testCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            },
        },
    ],
    codeStubs: [
        {
            language: {
                type: String,
                enum: ["c_cpp", "java", "python"],
                required: true,
            },
            startSnippet: {
                type: String,
                required: true,
            },
            userSnippet: {
                type: String,
                required: true,
            },
            endSnippet: {
                type: String,
                required: true,
            },
        },
    ],
    topic: {
        type: String,
        enum: ["Arrays", "Linked Lists", "Stacks", "Queues", "Hash Tables", "Heaps", "Trees", "Binary Trees", "Binary Search Trees", "Graphs", "Tries", "Sorting", "Searching", "DP", "Recursion", "Backtracking", "Greedy", "Bit Manipulation", "Misc"],
        required: [true, "Problem should be associated with one topic"],
        default: "Misc",
    },
    actualCode: {
        type: String,
        required: [true, "Actual Code is required for Expected result for Custom code execution"]
    },
    editorial: {
        type: String,
    },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
