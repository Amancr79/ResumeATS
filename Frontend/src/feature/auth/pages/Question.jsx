import { useState } from "react";
import "./questions.scss";

export const Question = ({Ques}) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const questionsData = Ques;
  // const questionsData = [
  //   {
  //     id: 1,
  //     question: "Explain the Node.js event loop and how it handles async I/O?",
  //     intention:"This is intention part",
  //     answer:
  //       "Node.js uses an event loop to handle async operations using callbacks, promises, and queues...",
  //   },
  //   {
  //     id: 2,
  //     question: "How do you optimize a MongoDB aggregation pipeline?",
  //      intention:"This is intention part",
  //     answer:
  //       "Use indexes, reduce stages, avoid unnecessary projections, and use $match early...",
  //   },
  //   {
  //     id: 3,
  //     question: "Explain Cache-Aside pattern with Redis",
  //     answer:
  //       "Data is loaded into cache only when necessary, improving performance and reducing DB load...",
  //     intention:"This is intention part",
  //   },
  //   {
  //     id: 4,
  //     question: "Challenges in migrating monolith to microservices?",
  //      intention:"This is intention part",
  //     answer:
  //       "Data consistency, service communication, deployment complexity, and monitoring...",
  //   },
  // ];

  const toggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="container">
      <div className="container-title">
        <h2>Technical Questions</h2>
        <span>{questionsData.length} questions</span>
      </div>

      {questionsData.map((item, index) => (
        <div
          key={item.id}
          className={`accordion-item ${openIndexes.includes(index) ? "active" : ""}`}
        >
          {/* Header */}
          <div className="accordion-header" onClick={() => toggle(index)}>
            <div className="question-left">
              <span className="badge">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item.question}</p>
            </div>

            <span className="icon">
              {openIndexes.includes(index) ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </span>
          </div>

          {/* Body */}
          {openIndexes.includes(index) && (
            <div className="accordion-body">
             <h3 className="intenion">Intenion</h3>
             <p>{item.intention}</p>
             <h3 className="answer">Model Answer</h3>
             <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
