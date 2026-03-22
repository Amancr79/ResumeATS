const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const interviewController = require("../controller/interview.controller");

/**
 * @route POST /api/interview/report
 * @description Generate an interview report based on the candidate's resume, job description, and self-description
 */

interviewRouter.post("/report", authMiddleware, upload.single("resume"), interviewController.generateUserInterviewReport);


module.exports = interviewRouter;