import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/matches',
});

// 🏏 Matches
export const getAllMatches = () => API.get('/get-matches');
export const getMatchesBySeason = (season) => API.get(`/season/${season}`);
export const getMatchesByTeam = (team) => API.get(`/team/${team}`);

// 📆 Seasons & Teams
export const getAllSeasons = () => API.get('/seasons');
export const getAllTeams = () => API.get('/teams');

// 🔥 Top Players
export const getTopPlayers = () => API.get('/analytics/top-players');
export const getTopPlayersByTeam = (team) => API.get(`/analytics/top-players/team/${team}`);
export const getTopPlayersBySeason = (season) => API.get(`/analytics/top-players/season/${season}`);
export const getTopPlayersBySeasonAndTeam = (season, team) =>
  API.get(`/analytics/top-players/season/${season}/team/${team}`);

// 📊 Team & Head-to-Head Stats
export const getTeamStats = (team) => API.get(`/analytics/team/${team}/stats`);
export const getHeadToHeadStats = (team1, team2) =>
  API.get(`/analytics/head-head/${team1}/${team2}`);

