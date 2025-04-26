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

import { useEffect, useState } from 'react';
import { getHeadToHeadStats } from '../../services/api';
import './HeadToHeadStats.css';

export const HeadToHeadCharts = ({ team1, team2 }) => {
  const [headToHeadData, setHeadToHeadData] = useState(null);

  useEffect(() => {
    const fetchHeadToHeadData = async () => {
      try {
        const data = await getHeadToHeadStats(team1, team2);
        console.log(data)
        setHeadToHeadData(data);
      } catch (error) {
        console.error('Failed to fetch head-to-head stats:', error);
      }
    };

    if (team1 && team2) {
      fetchHeadToHeadData();
    }
  }, [team1, team2]);

  if (!headToHeadData) return <p>Loading...</p>;

  return (
    <div className="head-to-head-container">
      <div className="chart-row">
        <div className="chart-item">
          <h4>Win Comparison</h4>
          <p>Compare the win stats between {team1} and {team2} in previous matches.</p>
          <WinComparisonChart
            team1={team1}
            team2={team2}
            team1Wins={headToHeadData.data.team1_win}
            team2Wins={headToHeadData.data.team2_win}
          />
        </div>

        <div className="chart-item">
          <h4>Toss Wins Comparison</h4>
          <p>Visualize the toss win stats for {team1} and {team2}.</p>
          <TossWinBarChart
            team1={team1}
            team2={team2}
            team1Wins={headToHeadData.data.team1_tossWin}
            team2Wins={headToHeadData.data.team2_tossWin}
          />
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-item">
          <h4>Top Run Scorer</h4>
          <p>See the highest run scorer between {team1} and {team2}.</p>
          <TopPerformerChart
            label="Top Run Scorer"
            name={headToHeadData.data.topRunScorer.player}
            value={headToHeadData.data.topRunScorer.runs}
            color="#3b82f6"
          />
        </div>

        <div className="chart-item">
          <h4>Top Wicket Taker</h4>
          <p>Compare the top wicket takers for {team1} and {team2}.</p>
          <TopPerformerChart
            label="Top Wicket Taker"
            name={headToHeadData.data.topBowler.player}
            value={headToHeadData.data.topBowler.wickets}
            color="#ef4444"
          />
        </div>
      </div>
    </div>
  );
};

export const WinComparisonChart = ({ team1, team2, team1Wins, team2Wins }) => {
  const data = [
    { name: team1, value: team1Wins },
    { name: team2, value: team2Wins }
  ];
  const COLORS = ['#22d3ee', '#facc15'];

  return (

    <ResponsiveContainer width="100%" height={300}>
      <div className="legend-container">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#22d3ee' }}></span>
          <span className="legend-label">{team1}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#facc15' }}></span>
          <span className="legend-label">{team2}</span>
        </div>
      </div>

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
export const TossWinBarChart = ({ team1, team2, team1Wins, team2Wins }) => {
  const data = [
    { name: team1, value: team1Wins },
    { name: team2, value: team2Wins }
  ];
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
    <div style={{ width: '100%' }}>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>{name}</p>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, left: 100, right: 30, bottom: 10 }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill={color}>
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
