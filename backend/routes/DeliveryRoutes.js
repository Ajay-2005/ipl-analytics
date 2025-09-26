const express = require('express');
const router = express.Router();

const deliveryController = require('../controller/deliveryController');

/**
 * @swagger
 * /analytics/batting-summary/{team}:
 *   get:
 *     summary: Get batting summary for a team
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: team
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: Batting summary retrieved successfully
 */
router.get("/analytics/batting-summary/:team", deliveryController.getBattingSummary);

/**
 * @swagger
 * /analytics/bowling-summary/{team}:
 *   get:
 *     summary: Get bowling summary for a team
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: team
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the team
 *     responses:
 *       200:
 *         description: Bowling summary retrieved successfully
 */
router.get("/analytics/bowling-summary/:team", deliveryController.getBowlingSummary);

/**
 * @swagger
 * /top-runscorers:
 *   get:
 *     summary: Get top run scorers
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top run scorers retrieved successfully
 */
router.get("/top-runscorers", deliveryController.getTopRunScorers);

/**
 * @swagger
 * /top-wicket-takers:
 *   get:
 *     summary: Get top wicket takers
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top wicket takers retrieved successfully
 */
router.get("/top-wicket-takers", deliveryController.getTopWicketTakers);

/**
 * @swagger
 * /PlayerStats/{player}:
 *   get:
 *     summary: Get detailed stats for a specific player
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: player
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the player
 *     responses:
 *       200:
 *         description: Player stats retrieved successfully
 */
router.get("/PlayerStats/:player", deliveryController.getPlayerStats);

module.exports = router;
