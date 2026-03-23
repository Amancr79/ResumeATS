import { useContext, useEffect } from "react";
import { InterviewContext } from "../context/Interview.context.jsx";
import { useParams } from "react-router-dom";
import {
  getInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
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

  useEffect(() => {
    console.log("$$$$$$$$$$$$$$$$$$$" , id);
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
  };
};
