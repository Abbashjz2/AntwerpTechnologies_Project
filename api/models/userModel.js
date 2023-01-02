const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please ad a NAME']
    },
    email: {
        type: String,
        required: [true, 'Please ad an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please ad a Password']
    },
    gender: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    file: {
        type: Object
    },
    notification: [
        {
            campaign: {
                type: Object
            }
        }
    ],
    messages: [
        {
            type: Object
        }
    ]
},
    {
        timestamps: true,
    })

module.exports = mongoose.model('User', userSchema)