# CodeQuest - Problem Service

The **Problem-Service** is a microservice in CodeQuest, a LeetCode-style coding platform. It manages problem-related functionalities, including:

- Creating new problems
- Fetching problems by ID
- Fetching all problems
- Updating problems
- Deleting problems
- Fetching top-rated problems

## Features

- RESTful API endpoints for problem management
- MongoDB database for storing problems
- Clean architecture with controllers, services, and repositories
- Error handling and logging

## Tech Stack

- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Logging:** Winston

## API Endpoints

### 1. Create a Problem

**POST** `/api/v1/problems`

#### Request Body:

```js
{
    "title": String,
    "description": String,
    "difficulty": "easy" | "medium" | "hard",
    "timeLimit": Number,
    "testCases": [
        {
            "input": String,
            "output": String
        }
    ],
    "codeStubs": [
        {
            "language": "c_cpp" | "java" | "python",
            "startSnippet": String,
            "userSnippet": String,
            "endSnippet": String
        }
    ],
    "topic": String,
    "actualCode": String,
    "editorial": String
}

```

#### Response:

```js
{
    "success": Boolean,
    "message": String,
    "error": {},
    "data": {}
}
```

#### Example Request Body

```json
{
  "title": "Find Cube of a Number",
  "description": "Given an integer n, return its cube.",
  "difficulty": "easy",
  "timeLimit": 1000,
  "testCases": [
    {
      "input": "2",
      "output": "8"
    },
    {
      "input": "-3",
      "output": "-27"
    },
    {
      "input": "5",
      "output": "125"
    }
  ],
  "codeStubs": [
    {
      "language": "c_cpp",
      "startSnippet": "#include <bits/stdc++.h>\nusing namespace std;",
      "userSnippet": "class Solution {\npublic:\n    int cube(int n) {\n\n    }\n};\n",
      "endSnippet": "int main() {\n    int n;\n    if (!(cin >> n)) {\n        cerr << \"Error: Not enough input Provided\";\n        return 1;\n    }\n    Solution sol;\n    cout << sol.cube(n);\n    return 0;\n}"
    },
    {
      "language": "java",
      "startSnippet": "import java.util.*;",
      "userSnippet": "class Solution {\n    public int cube(int n) {\n\n    }\n}",
      "endSnippet": "public class Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    if (!scanner.hasNextInt()) {\n        System.err.println(\"Error: Not enough input Provided\");\n        return;\n    }\n    int n = scanner.nextInt();\n    Solution solution = new Solution();\n    System.out.println(solution.cube(n));\n  }\n}"
    },
    {
      "language": "python",
      "startSnippet": "import sys\ndef main():\n    try:\n        n = int(input())\n    except ValueError:\n        print(\"Error: Not enough input Provided\", file=sys.stderr)\n        sys.exit(1)\n    sol = Solution()\n    print(sol.cube(n))",
      "userSnippet": "class Solution:\n    def cube(self, n):\n",
      "endSnippet": "if __name__ == \"__main__\":\n    main()"
    }
  ],
  "topic": "Misc",
  "actualCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int cube(int n) {\n        return n * n * n;\n    }\n};\n\nint main() {\n    int n;\n    if (!(cin >> n)) {\n        cerr << \"Error: Not enough input Provided\";\n        return 1;\n    }\n    Solution sol;\n    cout << sol.cube(n);\n    return 0;\n}",
  "editorial": "This problem is a simple mathematical operation where we calculate the cube of an integer by multiplying it three times."
}
```

#### Example Response

```json
{
    "success": true,
    "message": "Successfully created a new problem",
    "error": {},
    "data": { "_id": "123", "title": "Find Cube of a Number", "......" },
}
```

### 2. Get All Problems

**GET** `/api/v1/problems`

#### Response:

```json
[
  { "_id": "123", "title": "Find Cube of a Number", "......" },
  { "_id": "456", "title": "Two Sum", "......" },
  { "_id": "789", "title": "Reverse String", "......" },
  "......"
  "......"
  "......"
]
```

### 3. Get a Problem by ID

**GET** `/api/v1/problems/:id`

#### Response:

```json
{
  "_id": "123",
  "title": "Find Cube of a Number",
  "description": "Given an integer n, return its cube.",
  "......"
}
```

### 4. Update a Problem

**PUT** `/api/v1/problems/:id`

#### Request Body (Partial Update Allowed):

```json
{
  "difficulty": "medium"
}
```

#### Response:

```json
{
    "success": true,
    "message": "Successfully updated the problem",
    "error": {},
    "data": { "_id": "123", "difficulty": "medium", "......" },
}
```

### 5. Delete a Problem

**DELETE** `/api/v1/problems/:id`

#### Response:

```json
{
    "success": true,
    "message": "Successfully deleted the problem",
    "error": {},
    "data": { "_id": "123", "title": "Find Cube of a Number", "......" },
}
```

### 6. Get Top Problems

**GET** `/api/v1/problems/top`

#### Response:

```json
{
    "success": true,
    "message": "Successfully fetched top problems",
    "error": {},
    "data": [
        { "_id": "123", "title": "Find Cube of a Number", "......"},
        { "_id": "456", "title": "Two Sum", "......" },
        { "_id": "789", "title": "Reverse String", "......" }
        "......"
        "......"
        "......"
    ]
}
```

## Database Schema (MongoDB)

```js
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
  timeLimit: {
    // in Milliseconds
    type: Number,
    required: [true, "Code Execution Time Limit is required"],
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
    enum: [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Hash Tables",
      "Heaps",
      "Trees",
      "Binary Trees",
      "Binary Search Trees",
      "Graphs",
      "Tries",
      "Sorting",
      "Searching",
      "DP",
      "Recursion",
      "Backtracking",
      "Greedy",
      "Bit Manipulation",
      "Misc",
    ],
    required: [true, "Problem should be associated with one topic"],
    default: "Misc",
  },
  actualCode: {
    type: String,
    required: [
      true,
      "Actual Code(only C++) is required for Expected result for Custom code execution",
    ],
  },
  editorial: {
    type: String,
  },
});
```

## Error Handling

Centralized error handling is managed in `utils/errorHandler.js`.

### Error Classes

The following custom error classes are implemented:

- **BadRequest** (400) – Used for missing or invalid request parameters.
- **NotFound** (404) – Used when a requested resource is not found.
- **InternalServerError** (500) – Used for unexpected server failures.
- **NotImplemented** (501) – Used for features that are not yet implemented.

### Error Response Format

All errors follow a consistent response structure:

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": "<detailed error message>",
  "data": {}
}
```

## Logging

Logging is configured using Winston in `config/logger.config.js`.

[Winston](https://github.com/winstonjs/winston), a powerful logging library for Node.js. This setup ensures logs are recorded in the console, a MongoDB collection, and a file (`app.log`).

## Log Levels

The logger supports different log levels:

- **info** – General application logs (e.g., successful operations)
- **warn** – Warning messages (e.g., deprecations, potential issues)
- **error** – Critical errors (e.g., failed database queries, unhandled exceptions)

## Logging Format

Each log entry follows this structure:

```
YYYY-MM-DD hh:mm:ss.SSS AM/PM [LEVEL]: [Message]
```

Example:

```
2025-03-12 10:47:52.135 AM [info]: [ProblemRepository.createProblem] Problem created successfully: problemID - 67d11900a4cbc1ebac74649e
2025-03-12 10:47:11.704 AM [error]: [ProblemRepository.updateProblem] Problem not found with ID: 678553ac299bee9373aff901
```

## Installation & Setup

### Prerequisites

- Node.js (Latest LTS version)
- MongoDB (Local or cloud-based like MongoDB Atlas)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/NishantDongre/Problem-Service.git
   cd Problem-Service-master
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env`):
   ```env
   PORT=4000
   ATLAS_DB_URL="mongodb://localhost:27017/codequest"
   LOG_DB_URL="mongodb://localhost:27017/codequestLogging"
   NODE_ENV="development"
   ```
4. Start the service:
   ```sh
   npm run dev
   ```
