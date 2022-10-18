const express = require('express')
const router = express.Router()
const uploadImg = require('../middleware/imageUpload')

const addPhotoDeProfileCtr = require('../controllers/photoDeProfileCtr')

router.route('/:id').post(uploadImg, addPhotoDeProfileCtr)


module.exports = router 