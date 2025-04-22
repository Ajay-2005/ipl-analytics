// src/components/Dashboard/StatsOverview.jsx
import React from 'react';

const StatsOverview = ({ stats }) => {
  return (
    <div className="stats-overview">
      <div className="stat-card">
        <h3>Total Matches</h3>
        <p>{stats.totalMatches}</p>
      </div>

      <div className="stat-card">
        <h3>Total Teams</h3>
        <p>{stats.totalTeams}</p>
      </div>
     
      <div className="stat-card">
        <h3>Total Seasons</h3>
        <p>{stats.totalSeasons}</p>
      </div>
    </div>
  );
};

export default StatsOverview;
