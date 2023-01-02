const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getAll, updateUsers, findUser, removeNotification, updateInbox, getMessages} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../multer/image_helper')


router.post('/',upload.single('file'), registerUser)
router.get('/getall',protect, getAll)
router.get('/:id/message',protect, getMessages)
router.post('/login', loginUser)
router.put('/:id',upload.single('file'), updateUsers, protect)
router.get('/:id' , protect, findUser)
router.put('/remove-notification/:id' , protect, removeNotification)

module.exports = router;