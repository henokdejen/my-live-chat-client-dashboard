import React from "react";
import "./reportTimeReport.scss";

export const RealTimeReport = ({ realTimeReports }) => {
  return (
    <div className="real-time-report-wrapper report-card">
      <div className="report-card-title">Real Time Reports</div>

      <div className="real-time-reports">
        {realTimeReports.map((report, i) => (
          <div className="card-section" key={i}>
            <div className="card-section-body">
              <div className="real-time-report-item">
                <div className="real-time-report-value">
                  {report.value}{" "}
                  {report.outOf && (
                    <span className="out-of">(of {report.outOf})</span>
                  )}
                </div>

                <div className="real-time-report-attribute text-align-center">
                  {report.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
