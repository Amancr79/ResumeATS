import React from "react";
import "./report.scss";

export const Skillgap = ({ report }) => {
    console.log("report" , report.skillGaps );
  return (
    <div className="skill-gap-main">
      <div className="match-container">
        <h4>Match Score</h4>
        <div className="match-score-container">
          <div className="match-score">
            <h2>{report.matchScore}</h2>
            <h4>%</h4>
          </div>
          <p>
            {report.matchScore >= 70
              ? "Strong match for this role"
              : "Improve your skill to match this role"}
          </p>
        </div>
      </div>
      <h3>SKILL GAPS</h3>
      <div className="grid">
          {report?.skillGaps?.length > 0 ? (
            report.skillGaps.map((item, idx) => (
              <div key={idx} className={`chip ${item.severity}`}>
                {item.skill}
              </div>
            ))
          ) : (
            <p>No skill gaps identified.</p>
          )}
        </div>
    </div>
  );
};
