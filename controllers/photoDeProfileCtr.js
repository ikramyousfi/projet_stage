const Image = require('../models/Image');
const User = require('../models/user')
const Client = require('../models/client')
const { StatusCodes } = require('http-status-codes')

const addPhotoDeProfileCtr = async (req, res) => {
    try {
        const path = req.file.path;
        const image = await Image.create({ path });
        const { id: userId } = req.params;
        const client = await Client.findOneAndUpdate({ idClient: userId }, { idImageCurrent: image._id },
            {
                new: true,
                runValidators: true,
            });






        res.status(StatusCodes.CREATED).json({ image });


    } catch (error) {
        res.status(500).json({ msg: error })
    }

}



module.exports = addPhotoDeProfileCtr

