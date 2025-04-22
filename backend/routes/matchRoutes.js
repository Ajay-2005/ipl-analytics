const express = require('express')
const router = express.Router();
const matchController = require('../controller/matchController');

/**
 * @swagger
 * /api/matches/get-matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of IPL matches
 */

/**
 * @swagger
 * /api/matches/season/{season}:
 *   get:
 *     summary: Get all matches for a specific season
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: string
 *         description: The IPL season (e.g., 2020)
 *     responses:
 *       200:
 *         description: List of IPL matches for the specified season
 */

/**
 * @swagger
 * /api/matches/seasons:
 *   get:
 *     summary: Get all unique IPL seasons
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of IPL seasons
 */

/**
 * @swagger
 * /api/matches/teams:
 *   get:
 *     summary: Get all unique IPL teams
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of IPL teams
 */

/**
 * @swagger
 * /api/matches/team/{team}:
 *   get:
 *     summary: Get all matches played by a specific team
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: List of matches for the specified team
 */

/**
 * @swagger
 * /api/matches/analytics/top-players:
 *   get:
 *     summary: Get top performing players overall
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of top performing players
 */

/**
 * @swagger
 * /api/matches/analytics/top-players/team/{team}:
 *   get:
 *     summary: Get top performing players for a specific team
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: List of top players for the specified team
 */

/**
 * @swagger
 * /api/matches/analytics/top-players/season/{season}:
 *   get:
 *     summary: Get top performing players in a specific season
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: string
 *         description: The IPL season (e.g., 2019)
 *     responses:
 *       200:
 *         description: List of top players for the specified season
 */

/**
 * @swagger
 * /api/matches/analytics/top-players/season/{season}/team/{team}:
 *   get:
 *     summary: Get top performing players for a specific team in a specific season
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: string
 *         description: The IPL season (e.g., 2021)
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: List of top players for the team in the specified season
 */

/**
 * @swagger
 * /api/matches/analytics/team/{team}/stats:
 *   get:
 *     summary: Get overall statistics for a specific team
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: Team statistics
 */

/**
 * @swagger
 * /api/matches/analytics/head-head/{team1}/{team2}:
 *   get:
 *     summary: Get head-to-head stats between two teams
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: team1
 *         required: true
 *         schema:
 *           type: string
 *         description: First team name
 *       - in: path
 *         name: team2
 *         required: true
 *         schema:
 *           type: string
 *         description: Second team name
 *     responses:
 *       200:
 *         description: Head-to-head statistics
 */

router.get('/get-matches', matchController.getMatches);
router.get('/season/:season', matchController.getMatchesBySeason);
router.get('/seasons', matchController.getAllSeasons);
router.get('/teams', matchController.getAllTeams)
router.get('/team/:team', matchController.getMatchesByTeam);
router.get('/analytics/top-players', matchController.getTopPlayers);
router.get('/analytics/top-players/team/:team', matchController.getTopPlayersByTeam);
router.get('/analytics/top-players/season/:season', matchController.getTopPlayersBySeason);
router.get('/analytics/top-players/season/:season/team/:team', matchController.getTopPlayersBySeasonAndTeam);
router.get('/analytics/team/:team/stats', matchController.getTeamStats);
router.get('/analytics/head-head/:team1/:team2', matchController.getHeadToHeadStats);




module.exports = router;