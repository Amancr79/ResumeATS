const interviewReportModel = require("../schema/interview/interviewReport.model");
const generateInterviewReport = require("../service/ai.service");
const pdfParse = require("pdf-parse");

async function generateUserInterviewReport(req, res) {
  const resumeFile = req.file;
  const { jobDescription, selfDescription } = req.body;
  console.log("req #########################", req.file);
  const content = await new pdfParse.PDFParse(
    Uint8Array.from(resumeFile.buffer),
  ).getText();

  try {
    const response = await generateInterviewReport({
      selfDescription,
      jobDescription,
      resume: content.text,
    });

    const title = response.title || "SDE";
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      jobDescription,
      title: title,
      resume: content.text,
      ...response,
    });
    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Error generating interview report",
        error: err.message,
      });
  }
}

async function getInterviewReportById(req, res) {
  const { interviewId } = req.params;

  const response = await interviewReportModel.findById({
    _id: interviewId,
    user: req.user.id,
  });

  if (!response) {
    res.status(404).json({ message: "No such report found !" });
  }

  res.status(201).json({ message: "report fetched successfully", interviewReport: response });
}

async function getAllInterviewReportForUser(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -preparationPlan -skillGaps -technicalQuestions -behavioralQuestions",
    );
  res
    .status(201)
    .json({
      message: "Interview report fetched successfully",
      interviewReport: interviewReports,
    });
}
module.exports = {
  generateUserInterviewReport,
  getInterviewReportById,
  getAllInterviewReportForUser,
};
