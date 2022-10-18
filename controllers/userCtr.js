const User= require('../models/user')
const Client=require('../models/client')


const { StatusCodes } = require('http-status-codes')

//registration clients 
const register= async (req,res)=>{
    try {
        const { email, password, adresse,telephone,nom, prenom, date_de_naissance} = req.body;
      
        const userEmail = await User.findOne({email});
        const phone = await Client.findOne({telephone});
        if (userEmail || phone) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "This email or phone number already exist." });
        }
        
      
        const user = await User.create({ email, password});
        const query = { _id: user._id };
        const client= await Client.create({adresse,telephone,nom, prenom, date_de_naissance, idClient:query});
        res.status(StatusCodes.CREATED).json({ id: query, user, client });
       } catch (err) { 
         console.log(err);
        return res.status(500).json({ msg: err.message });
       
      } 


    }
//login user or admin
    const login= async (req,res)=>{
        try {
          const {email, password} = req.body;  
          const user = await User.findByCredentials(email, password);
          const here= await User.find()
          await user.save();
          const token = user.createJWT()
// req.user._id logged in user
          const query = { _id: user._id };
          const profile= await Client.findOne({idClient:query }).select('-password');
          console.log(profile);

          
         

          res.status(StatusCodes.OK).json({ user: {id: query, user, profile }, token }) 
          
         
          } catch (e) {
              res.status(400).json(e.message)
          }


        }

module.exports={register, login}