const express = require('express')
const router = express.Router()
const { updateProfile, loadProfile, getAllofThem } = require('../controllers/profileCtr')

router.route('/getThemAll').get(getAllofThem)
router.route('/:id').get(loadProfile).patch(updateProfile)



module.exports = router;