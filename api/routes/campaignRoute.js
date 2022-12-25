const express = require('express');
const router = express.Router();
const { getCampaigns, setCampaign, deleteCampaign, updateCampaign, campaignStats } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect,getCampaigns).post(protect, setCampaign)
router.route('/:id').delete(protect, deleteCampaign).put(protect, updateCampaign)
router.route('/stats').get( campaignStats)
module.exports = router