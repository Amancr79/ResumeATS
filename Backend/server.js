const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const connectDatabase = require("./src/config/database");
const generateInterviewReport = require("./src/service/ai.service");
const {resume , jobDescription, selfDescription} = require("./src/service/temp");

connectDatabase();

// generateInterviewReport({ resume, jobDescription, selfDescription });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



