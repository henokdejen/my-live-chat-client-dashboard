import React from "react";
import "./todaysReport.scss";

export const TodaysReport = ({ todaysReport }) => {
  let todaysData = [];
  if (todaysReport) {
    todaysData = [
      {
        label: "Visitors",
        value: todaysReport.visitors || 0,
      },
      {
        label: "Chats",
        value: todaysReport.conversations || 0,
      },
      {
        label: "Tickets",
        value: todaysReport.tickets || 0,
      },
    ];
  }

  return (
    <div className="real-time-report-wrapper report-card">
      <div className="report-card-title">Today's Report</div>
      <div className="report-card-body today-report-body">
        {todaysData ? (
          todaysData.map((report, i) => (
            <div className="today-report-card" key={i}>
              <div className="today-report-value text-align-center">
                {report.value}
              </div>

              <div className="today-report-lable text-align-center">
                {report.label}
              </div>

              <div className="today-report-summary text-align-center">
                some report neger
              </div>
            </div>
          ))
        ) : (
          <div>No data </div>
        )}
      </div>
    </div>
  );
};
