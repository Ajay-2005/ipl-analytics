// HeadToHeadCharts.js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Win Comparison Chart
export const WinComparisonChart = ({ team1, team2, team1Wins, team2Wins }) => {
  const data = [
    { name: team1, value: team1Wins },
    { name: team2, value: team2Wins }
  ];
  const COLORS = ['#22d3ee', '#facc15'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Toss Wins Bar Chart
export const TossWinBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, left: 100, right: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill="#a855f7">
          <LabelList dataKey="value" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};


export const TopPerformerChart = ({ label, name, value, color = "#4ade80" }) => {
  const data = [{ name, value }];

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4 style={{ textAlign: 'center' }}>{label}</h4>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, left: 100, right: 30, bottom: 10 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" hide />
          <Bar dataKey="value" fill={color}>
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
