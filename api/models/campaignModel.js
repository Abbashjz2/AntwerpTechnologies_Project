const mongoose = require('mongoose')

const campaignSchema = mongoose.Schema({

    id: {
        type: Number,
        required: [true, "PLease enter campaign ID"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please enter campaign name"],
        unique: true
    },
    type: {
        type: String,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    isClonned: {
        type: Boolean,
        required: true
    },
    users:
        [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            }
        ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Campaign', campaignSchema)