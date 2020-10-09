// import React from "react";

// // export const VisitorSatisfaction = ({ data }) => {
// //   return <div className="visitor-satisfaction-wrapper"></div>;
// // };

// import { PieChart, Pie, Legend, Tooltip } from "recharts";

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 278 },
//   { name: "Group F", value: 189 },
// ];

// export const VisitorSatisfaction = () => {
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         dataKey="value"
//         data={data01}
//         cx={500}
//         cy={200}
//         innerRadius={40}
//         outerRadius={80}
//         fill="#82ca9d"
//       />
//       <Tooltip />
//     </PieChart>
//   );
// };

import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./visitorSatisfaction.scss";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#00C49F", "#dd0000"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const VisitorSatisfaction = () => {
  return (
    <div className="visitor-satisfaction">
      <div className="report-card-title">User Satisfaction</div>
      <div className="visitor-pie">
        <ResponsiveContainer width="90%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx={170}
              cy={160}
              isAnimationActive={false}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
