import React from "react";
import "./reportGrapher.scss";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const lineColors = ["#8884d8", "#82ca9d", "#992351"];

export const ReportGrapher = ({ data, yaxisKeys }) => {
  console.log("hein", data, yaxisKeys);
  return (
    <div className="report-chart-wrapper">
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {yaxisKeys.map((yaxisKey, i) => (
            <Line
              type="monotone"
              dataKey={yaxisKey}
              stroke={lineColors[i]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
