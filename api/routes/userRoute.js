const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getAll, updateUsers, findUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../multer/image_helper')


router.post('/', registerUser)
router.get('/getall',protect, getAll)
router.post('/login', loginUser)
router.put('/:id',upload.single('file'), updateUsers, protect)
router.get('/:id' , protect, findUser)

module.exports = router;