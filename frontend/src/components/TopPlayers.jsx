import React from "react";
import {
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Bar
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 100, bottom: 80}}
        layout="vertical" // For horizontal bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category"/>
        
        
        {/* Tooltip */}
        <Tooltip />
        
        {/* Bar element */}
        <Bar dataKey="value" fill="#22d3ee">
          {/* Label for the bars */}
          <LabelList dataKey="value" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
