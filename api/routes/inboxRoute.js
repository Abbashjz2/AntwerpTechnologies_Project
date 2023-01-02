const express = require('express');
const router = express.Router();
const { updateInbox} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.put('/update-inbox' , protect, updateInbox)


module.exports = router;