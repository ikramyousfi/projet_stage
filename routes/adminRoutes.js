const express=require('express')
const router = express.Router()

const {createAdminPrincipale}= require('../controllers/adminCtr')


//Auth routes
router.route('/all/:id').post(createAdminPrincipale)



module.exports= router