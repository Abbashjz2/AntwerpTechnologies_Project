const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}
const findUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).json(user)
})
const getMessages = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).json(user.messages)
})

const getAll = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender, company } = req.body

    if (!name || !email || !password || !gender || !company) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    if (req.file) {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            company,
            file: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2)
            },
        })


        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                company: user.company,
                file: user.file?.filePath,
                messages: user.messages,
                createdAt: user.createdAt,
                notification: user.notification,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } else {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            company,
            file: null
        })
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                company: user.company,
                createdAt: user.createdAt,
                notification: user.notification,
                messages: user.messages,
                file: null,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter your Email & Password')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            company: user.company,
            createdAt: user.createdAt,
            file: user.file,
            messages: user.messages,
            notification: user.notification,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const updateUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    const { name, gender, password, company, email } = req.body
    if (!user) {
        res.status(400)
        throw new Error("User Not found")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    if (req.file) {
        const newItem = {
            _id: user.id,
            name,
            gender,
            company,
            email,
            createdAt: user.createdAt,
            notification: user.notification,
            messages: user.messages,
            file: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2)
            },
            token: generateToken(user._id)
        }
        const itemToData = {
            name,
            gender,
            company,
            password: hashedPassword,
            email,
            file: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2)
            },
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, itemToData, { new: true })
        res.status(200).json(newItem)
    }
    else if (!req.file && user.file) {
        const newItem = {
            _id: user.id,
            name,
            gender,
            company,
            email,
            createdAt: user.createdAt,
            file: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2)
            },
            notification: user.notification,
            messages: user.messages,
            token: generateToken(user._id)
        }
        const itemToData = {
            _id: user.id,
            name,
            gender,
            company,
            password: hashedPassword,
            email,
            createdAt: user.createdAt,
            file: user.file,
            token: generateToken(user._id)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, itemToData, { new: true })
        res.status(200).json(newItem)
    }
    else {
        const newItem = {
            _id: user.id,
            name,
            gender,
            company,
            email,
            notification: user.notification,
            messages: user.messages,
            createdAt: user.createdAt,
            file: null,
            token: generateToken(user._id)
        }
        const itemToData = {
            name,
            gender,
            company,
            password: hashedPassword,
            email,
            file: null
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, itemToData, { new: true })
        res.status(200).json(newItem)
    }
})

const removeNotification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (user._id.toString() !== req.user._id.toString()) {

        res.status(401)
        throw new Error('User not authorized')

    }
    await User.findOneAndUpdate({"_id":req.params.id}, {
        $pull: {
            notification: {_id: req.body.id}
        }   
    }, {safe: true, upsert: true, new: true})

    res.status(200).json({id: req.body.id})
})

const updateInbox = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.sender)
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (user._id.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized')

    }
    const d = new Date();
    await User.findOneAndUpdate({"_id":req.body.sender}, {
        $push: {
                "messages": req.body

        }   
    }, {safe: true, upsert: true, new: true})

    const inboxUpdated =  await User.findOneAndUpdate({"_id": req.body.sendTo}, {
        $push: {
                "messages": req.body
        }   
    }, {safe: true, upsert: true, new: true})
    res.status(200).json(req.body)
})
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
module.exports = {
    registerUser,
    loginUser,
    getAll,
    updateUsers,
    findUser,
    removeNotification,
    updateInbox,
    getMessages
}