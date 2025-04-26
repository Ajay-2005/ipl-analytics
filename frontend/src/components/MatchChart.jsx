import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const MatchCountChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="season" type="category" />
        <Tooltip />
        <Bar dataKey="matchCount" fill="#22d3ee">
          <LabelList dataKey="matchCount" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MatchCountChart;
