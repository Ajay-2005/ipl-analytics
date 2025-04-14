const express=require('express')
const router=express.Router();
const matchController=require('../controller/MatchController');

router.get('/get-matches',matchController.getMatches);
router.get('/season/:season',matchController.getMatchesBySeason);
router.get('/seasons',matchController.getAllSeasons);
router.get('/team/:team',matchController.getMatchesByTeam);
router.get('/analytics/top-players',matchController.getTopPlayers);
router.get('/analytics/top-players/team/:team', matchController.getTopPlayersByTeam);
router.get('/analytics/top-players/season/:season', matchController.getTopPlayersBySeason);
router.get('/analytics/top-players/season/:season/team/:team', matchController.getTopPlayersBySeasonAndTeam);


module.exports=router;