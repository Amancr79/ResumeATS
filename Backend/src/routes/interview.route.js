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

/**
 * @route GET /api/interview/report?id
 * @description Get an interview report for particular user
 */

interviewRouter.get("/report/:interviewId", authMiddleware , interviewController.getInterviewReportById);

/**
 * @route GET /api/interview/report
 * @description Get all interview report for logged in user
 */

interviewRouter.get("/report", authMiddleware , interviewController.getAllInterviewReportForUser);

/**
 * @route GET api/interview//report/resume/pdf
 * @description generate resume summary pdf 
 */

interviewRouter.post("/resume/pdf/:interviewId" , authMiddleware , interviewController.generateResumeSummaryPDF);

module.exports = interviewRouter;