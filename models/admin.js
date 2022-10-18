const mongoose = require('mongoose');
const user = require('./user')


const adminSchema = new mongoose.Schema(
  {
    idAdmin:{
        type: mongoose.Types.ObjectId,
        ref: user,
        required: true
      },
  
})

  module.exports= mongoose.model('Admin', adminSchema)