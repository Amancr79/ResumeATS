import React, { useRef, useState } from "react";
import "./home.scss";
import { useInterview } from "../hook/Interview.hook";
import { useNavigate } from "react-router";

export const Homepage = () => {
  const { loading, generateReport, reports } = useInterview();
  const resumeInputRef = useRef(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume: resumeFile,
    });
    console.log("reports", reports);
    if (!data) {
      navigate("/homepage");
      console.log("error in data");
    } else {
      navigate(`/report/${data.interviewReport._id}`);
    }
  };

  if (loading || !reports) {
    return (
      <main>
        <h1>Loading ......</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <h1>
        <span className="title">Interview Prep </span>Create your custom
        interview plan
      </h1>
      <div className="main-content-home">
        <div className="left">
          <textarea
            className="home-text"
            placeholder="Enter Job Description here ... "
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
          />
        </div>
        <div className="right">
          <p>
            You can either upload your Resume or can provide Self Description .
          </p>
          <div className="input-group">
            <label className="input-label" htmlFor="resume">
              Upload Resume
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <div className="input-group">
            <label htmlFor="self-description">Upload Self Description</label>
            <textarea
              id="self-description"
              name="self-description"
              placeholder="Describe yourself in self description box."
              value={selfDescription}
              onChange={(e) => {
                setSelfDescription(e.target.value);
              }}
            />
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Generate Interview Report
          </button>
        </div>
      </div>
      <div className="recent-report">
        <h3>Most recent reports</h3>
        <div className="reports-grid">
          {" "}
          {/* Updated class name */}
          {reports && reports.length > 0 ? (
            reports.map((item, index) => (
              <div
                className="report-card"
                key={item._id || index}
                onClick={() => navigate(`/report/${item._id}`)}
              >
                <h4 className="card-title">{item.title}</h4>
                <div className="card-footer">
                  <span className="card-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="card-score">
                    Matchscore: <strong>{item.matchScore}%</strong>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No Recent searches</p>
          )}
        </div>
      </div>
    </main>
  );
};
