const User = require('../models/user')
const Client = require('../models/client');
const Image = require('../models/Image')

const getAllofThem = async (req, res) => {
    const clients= await Client.find({ idClient: { $ne: req.user._id} })
    
    
    res.status(201).json({ clients })
}
const loadProfile = async (req, res) => {
    try {
        const { id: userId } = req.params
        const user = await User.findOne({ _id: userId })
        const client = await Client.findOne({ idClient: userId })
        const image = await Image.findOne({ _id: client.idImageCurrent })
        res.status(201).json({ user, client, image })

        if (!user) {
            return res.status(404).json({ msg: `No user with id : ${userId}` })
        }
        if (!image) {
            return res.status(404).json({ msg: `No image ` })
        }

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


const updateProfile = async (req, res) => {
    try {
        const { id: userId } = req.params
        const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
            new: true,
            runValidators: true,
        })

        const client = await Client.findOneAndUpdate({ idClient: userId },
            req.body, {
            new: true,
            runValidators: true,
        })

        if (!user) {
            return res.status(404).json({ msg: `No user with id : ${userId}` })
        }
        res.status(201).json({ user, client })

    } catch (error) {
        res.status(500).json({ msg: error })
    }



}


module.exports = { updateProfile, loadProfile,getAllofThem }

