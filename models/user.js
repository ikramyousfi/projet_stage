const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: [true, 'you must provide an email'],
        validate: [isEmail, "invalid email"],
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please provide a valid email',
        //   ],
        // trim: true,
        unique: true,
      },
    password: {
        type: String,
        required: [true, 'you must provide a password'],
      }
    },
    { timestamps: true }
    )



    userSchema.pre('save', function(next){
      const user = this;
      if(!user.isModified('password')) return next();
    
      bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
    
        bcrypt.hash(user.password, salt, function(err, hash){
          if(err) return next(err);
    
          user.password = hash
          next();
        })
    
      })
    
    })


 
  userSchema.methods.createJWT =  function(){
      return jwt.sign(
          { userId: this._id }, process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_LIFETIME,
          }
      )
  
  }
  
  
 
userSchema.statics.findByCredentials = async function(email, password) {
      
    const user = await this.findOne({email});
    
    if(!user) throw new Error('invalid email or password');
    
      const isMatch = await bcrypt.compare(password, user.password);
  
      if(!isMatch) throw new Error('invalid email or password')

      return user
    }
module.exports= mongoose.model('User', userSchema)