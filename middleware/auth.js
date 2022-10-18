const User = require('../models/user')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.send('Authentication invalid')
        console.log('gg');
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = User.findById(payload.id).select('-password')
        
        req.user = user
        req.user = { _id: payload.userId }
        
        
        next();
    } catch (error) {
        res.send('Authentication invalid')
    }
}

module.exports = auth