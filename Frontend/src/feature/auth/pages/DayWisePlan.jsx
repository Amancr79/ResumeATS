import React from "react";
import "./daywise.scss";


export const DayWisePlan = ({preparationPlan}) =>{

  const roadmapData = preparationPlan;
  return (
    <div className="container">
      <div className="container-title">
        <h2 className="heading">Preparation Road Map</h2>
        <div className="dayBadge">{roadmapData.length} day plan</div>
      </div>

      <div className="timeline">
        {roadmapData.map((item, index) => (
          <div key={index} className="itemWrapper">
            <div className="leftSection">
              <div className="circle" />
              {index !== roadmapData.length - 1 && <div className="line" />}
            </div>

            <div className="content">
              <div className="dayBadge">{item.day}</div>
              <h3 className="title">{item.focusArea}</h3>

              <ul className="list">
                {item.tasks.map((point, i) => (
                  <li key={i} className="listItem">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
