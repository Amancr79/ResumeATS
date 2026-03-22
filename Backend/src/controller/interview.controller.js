const interviewReportModel = require("../schema/interview/interviewReport.model");
const generateInterviewReport = require("../service/ai.service");
const pdfParse = require("pdf-parse");




async function generateUserInterviewReport(req, res) {
    const resumeFile = req.file;
    const { jobDescription, selfDescription } = req.body;
    const content = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

    try{
      const response = await generateInterviewReport({
        selfDescription,
        jobDescription,
        resume: content.text
      });
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            jobDescription,
            resume: content.text,
            ...response

        });
        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport

        });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Error generating interview report" , error: err.message });
    }
}

module.exports = {generateUserInterviewReport};