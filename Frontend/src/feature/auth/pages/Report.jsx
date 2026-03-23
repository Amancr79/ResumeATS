import React from "react";
import { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { Skillgap } from "./skillgap";
import { Homepage } from "./Homepage";
import { Question } from "./Question";
import { DayWisePlan } from "./DayWisePlan";
import { useInterview } from "../hook/Interview.hook";
import "./report.scss";

function Report() {
  const [activeTab, setActiveTab] = useState("technical");
  const { loading, report, generateReportByID } = useInterview();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(report);
  useEffect(() => {
    if (id) {
      generateReportByID(id);
    }
  }, [id]);
  
  if (loading || !report) {
    return (
      <main>
        <h1>Loading ......</h1>
      </main>
    );
  }

  const renderComponent = () => {
    switch (activeTab) {
      case "technical":
        return <Question Ques={report.technicalQuestions} />;

      case "behavioral":
        return <Question Ques={report.behavioralQuestions} />;

      case "plan":
        return <DayWisePlan preparationPlan={report.preparationPlan} />;

      default:
        return <Question Ques={report.technicalQuestions}/>;
    }
  };

  return (
    <main className="report-container">
      <div className="sidebar">
        <div>
          <h3 className="title">Interview Prep</h3>
          <ul className="sidebar-item">
            <li onClick={() => navigate("/homepage")}>Home</li>
            <li onClick={() => setActiveTab("technical")}>
              Technical Question
            </li>
            <li onClick={() => setActiveTab("behavioral")}>
              Behavioral Question
            </li>
            <li onClick={() => setActiveTab("plan")}>Day Wise Plan</li>
          </ul>
        </div>
        <div className="user-profile">
          <i className="fa-solid fa-circle-user fa-2x"></i>
          <h4 className="username">John Doe</h4>
        </div>
      </div>
      <div className="main-content">{renderComponent()}</div>
      <div className="skill-gap">
        <Skillgap report={report} />
      </div>
    </main>
  );
}

export default Report;
