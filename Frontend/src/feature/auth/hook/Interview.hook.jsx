import { useContext, useEffect } from "react";
import { InterviewContext } from "../context/Interview.context.jsx";
import { useParams } from "react-router-dom";
import {
  getInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
} from "../service/interview.api";

export const useInterview = () => {
  const interviewContextRes = useContext(InterviewContext);
  const { id } = useParams();
  if (!interviewContextRes) {
    throw new Error("useInterview must be used within context");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    interviewContextRes;
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    try {
      setLoading(true);
      const report = await getInterviewReport(
        jobDescription,
        selfDescription,
        resume,
      );
      if (!report) {
        console.log("no report found");
      }
      setReport(report.interviewReport);
      setLoading(false);
      return report;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generateReportByID = async (userId) => {
    try {
      setLoading(true);
      const report = await getInterviewReportById(userId);
      if (!report) {
        console.log("no report found");
      }
      setReport(report.interviewReport);
      console.log("hook" ,  report);
      setLoading(false);
      return report;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generateAllReport = async () => {
    try {
      setLoading(true);
      const report = await getAllInterviewReports();
      console.log("getALl repoprt" , report);
      if (!report) {
        console.log("no report found");
      }
      setReports(report.interviewReport);
      setLoading(false);
      return report;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async(id)=>{
    try{
      setLoading(true);
      const response = await generateResumePdf(id);
      const url = window.URL.createObjectURL(new Blob([response], {type : "application/pdf"}))
      const link = document.createElement("a");
      link.href =  url;
      link.setAttribute("download",`resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click()
    }
    catch(err){
      console.log(err);
    }finally{
      setLoading(true);
    }

  }

  useEffect(() => {
    if (id) {
      generateReportByID(id);
    } else {
      generateAllReport();
    }
  }, []);

  return {
    loading,
    report,
    reports,
    generateReport,
    generateAllReport,
    generateReportByID,
    generatePDF
  };
};
