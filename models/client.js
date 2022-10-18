const mongoose = require('mongoose');
const user = require('./user')
const image = require('./Image')


const clientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'you must provide your name'],
    },
    prenom: {
      type: String,
      required: [true, 'you must provide it'],
    },
    date_de_naissance: {
      type: String,
      required: [true, 'you must provide it'],

    },
    adresse:{
      type:String,
      // required: [true, 'you must provide an adresse'],
      maxlength: 20,
  },
    telephone:{
    type:String,
    // required: [true, 'you must provide a phone'],
    // maxlength: 10,
    unique: true,
  },
  solde_MEV:{
    type:String,
    default:"null"
   
  },
  active:{
    type:Boolean,
    default: false,
  },
  idClient:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  idImageCurrent: {
      type: mongoose.Types.ObjectId,
      ref: image,
    }

  })

module.exports = mongoose.model('Client', clientSchema)