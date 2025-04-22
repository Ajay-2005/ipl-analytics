const express=require('express')
const router=express.Router();

const deliveryController=require('../controller/deliveryController');

router.get("/analytics/batting-summary/:team",deliveryController.getBattingSummary);
router.get("/analytics/bowling-summary/:team",deliveryController.getBowlingSummary);

module.exports=router;