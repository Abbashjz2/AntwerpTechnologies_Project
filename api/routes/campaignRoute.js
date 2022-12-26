const express = require('express');
const router = express.Router();
const { getCampaigns, setCampaign, deleteCampaign, updateCampaign, campaignStats, getCampagin } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.route('/stats').get(protect,campaignStats)
router.route('/').get(protect,getCampaigns).post(protect, setCampaign)
router.route('/:id').delete(protect, deleteCampaign).put(protect, updateCampaign).get(protect, getCampagin)
module.exports = router