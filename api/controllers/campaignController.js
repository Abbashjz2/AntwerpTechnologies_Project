const Campaign = require('../models/campaignModel')
const user = require('../models/userModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const getCampaigns = asyncHandler(async (req, res) => {
    const campaigns = await Campaign.find()

    res.status(200).json(campaigns)
})

const getCampagin = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findOne({ _id: req.params.id })

    res.status(200).json(campaign)
})

const setCampaign = asyncHandler(async (req, res) => {
    
    if (!req.body.id || !req.body.name || !req.body.type || !req.body.user || !req.body.users) {
        res.status(400)
        throw new Error('Please Enter All field type')
    }
    const { id, name, type, isClonned, user, users } = req.body

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    const isExist = await Campaign.findOne({ id })
    if (isExist) {
        res.status(400)
        throw new Error('ID already exist, please change it')
    }
    const isExist1 = await Campaign.findOne({ name })
    if (isExist1) {
        res.status(400)
        throw new Error('Name already exist, please change it')
    }
    const newCampaign = await Campaign.create({
        id,
        name,
        type,
        isClonned,
        user,
        users,
    })

    const updated = () => {
         req.body.users.map(async (user) => {
        const isUserExists = await User.findById({ _id: user })
        if (isUserExists) {
            const updateNotification = await User.findOneAndUpdate({"_id":user}, {
                $push: {
                    notification: {
                        "campaign": newCampaign
                    }
                }   
            }, {safe: true, upsert: true, new: true})
        }
    })
    res.status(200).json(newCampaign)
}
updated()
})
const updateCampaign = asyncHandler(async (req, res) => {
    const campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
        res.status(400)
        throw new Error("Campagin Not found")

    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
        newCmapaign: updatedCampaign,
        campaignId: req.params.id
    })

})

const deleteCampaign = asyncHandler(async (req, res) => {

    const campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
        res.status(400)
        throw new Error("campaign Not found")
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (campaign.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')

    }
    await campaign.remove();
    res.status(200).json({ id: req.params.id })
})

const campaignStats = asyncHandler(async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await Campaign.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);
    const newData = data.sort((campaignA, campaignB) => {
        return campaignA._id - campaignB._id;

    });
    res.status(200).json(newData)
})

module.exports = {
    getCampaigns,
    setCampaign,
    deleteCampaign,
    updateCampaign,
    campaignStats,
    getCampagin
}