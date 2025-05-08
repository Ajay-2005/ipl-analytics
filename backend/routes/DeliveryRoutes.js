const express = require('express')
const router = express.Router();

const deliveryController = require('../controller/deliveryController');

router.get("/analytics/batting-summary/:team", deliveryController.getBattingSummary);
router.get("/analytics/bowling-summary/:team", deliveryController.getBowlingSummary);
router.get("/top-runscorers", deliveryController.getTopRunScorers);
router.get("/top-wicket-takers", deliveryController.getTopWicketTakers);
router.get("/PlayerStats/:player", deliveryController.getPlayerStats);

module.exports = router;