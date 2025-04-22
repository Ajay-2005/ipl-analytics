import React, { useState, useEffect } from "react";
import { getAllMatches, getAllSeasons, getAllTeams, getTopPlayers, getTopPlayersBySeason, getTopPlayersByTeam, getTopPlayersBySeasonAndTeam } from "../services/api";
import StatsOverview from "../components/StatsOverView";
import MatchCountChart from "../components/MatchChart";
import TopBar from "../components/Navbar/TopBar";
import SideBar from "../components/Navbar/SideBar";
import './Dashboard.css';
import BarChartComponent from "../components/TopPlayers"

const Dashboard = () => {
  const [totalStats, setTotalStats] = useState({ totalMatches: 0, totalTeams: 0, totalSeasons: 0 });
  const [seasonMatches, setSeasonMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topPlayers, setTopPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesResponse, seasonsResponse, teamResponse] = await Promise.all([
          getAllMatches(),
          getAllSeasons(),
          getAllTeams()
        ]);

        const matchCounts = {};
        matchesResponse.data.forEach((match) => {
          matchCounts[match.season] = (matchCounts[match.season] || 0) + 1;
        });
        // From matchesResponse.data


        const seasonMatchArray = Object.keys(matchCounts).map(season => ({
          season,
          matchCount: matchCounts[season]
        })).sort((a, b) => a.season - b.season);

        setTotalStats({
          totalMatches: matchesResponse.data.length,
          totalSeasons: seasonsResponse.data.length,
          totalTeams: teamResponse.data.length
        });
        console.log(teamResponse.data);
        setSeasonMatches(seasonMatchArray);
        setLoading(false);
        setTeams(teamResponse.data);
        setSeasons(seasonsResponse.data)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        let response;
        if (selectedTeam !== "All" && selectedSeason !== "All") {
          response = await getTopPlayersBySeasonAndTeam(
            selectedSeason,
            selectedTeam
          );
        } else if (selectedTeam !== "All") {
          response = await getTopPlayersByTeam(selectedTeam);
        } else if (selectedSeason !== "All") {
          response = await getTopPlayersBySeason(selectedSeason);
        } else {
          response = await getTopPlayers();
        }

        const playerData = response.data.map((player) => ({
          name: player.player,
          value: player._count.player,
        }));
        setTopPlayers(playerData);
      } catch (error) {
        console.error("Error fetching top players:", error);
      }
    };

    fetchTopPlayers();
  }, [selectedTeam, selectedSeason]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopBar />
      <SideBar />
      <div className="dashboard-heading">
        <h1>Howzat – IPL Analytics Dashboard</h1>
        <p className="dashboard-subtext">Your one-stop hub for IPL stats, trends, and insights!</p>
      </div>
      <div className="dashboard-container">
        <StatsOverview stats={totalStats} />
        <div className="charts-container">
          <div className="match-count-chart-section">
            <h2>Match Count by Season</h2>
            <p className="match-count-description">
              Here you can see the total number of matches played in each IPL season. This chart provides an overview of how the league has evolved over time.
            </p>
            <MatchCountChart data={seasonMatches} />
          </div>
          <div className="bar-chart-section">
            <h2>Top Players</h2>

            <p className="match-count-description">
              This chart displays the top players based on their performance in the IPL. The data is sourced from the latest matches and seasons, providing a comprehensive overview of player statistics.
            </p>
            <div className="filter-container">
              <label>
                Team:
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="All">All</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>

              </label>
              <label>
                Season:
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                >
                  <option value="All">All</option>
                  {seasons.map((seasonObj) => (
                    <option key={seasonObj.season} value={seasonObj.season}>
                      {seasonObj.season}
                    </option>
                  ))}

                </select>
              </label>
            </div>
            <BarChartComponent data={topPlayers} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
