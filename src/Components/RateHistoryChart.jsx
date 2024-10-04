// src/components/RateHistoryChart.js
import React from "react";
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

const RateHistoryChart = ({ history }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
        />
        <YAxis
          label={{
            value: "Conversion Rate",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RateHistoryChart;
