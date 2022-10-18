const asyncHandler = require("express-async-handler");
const Chat=require('../models/chat')
const User= require('../models/user')
const Message=require('../models/message')
const { StatusCodes } = require('http-status-codes')


const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Please Fill all the fields");
      return res.status(StatusCodes.BAD_REQUEST);
    }
    const UserExist= await Chat.findById(req.body.chatId, { users: { $elemMatch: { $eq: req.user._id } } });
    
    if(UserExist.users.length===0){
        res.status(StatusCodes.BAD_REQUEST).send('this is user does not exist in this group chat  ')
        
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "-password");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(error.message);
    }
  });

const allMessages = asyncHandler(async (req, res) => {
    try {
        const UserExist= await Chat.findById(req.params.chatId, { users: { $elemMatch: { $eq: req.user._id } } });
        if(UserExist.users.length===0){
        res.status(StatusCodes.BAD_REQUEST).send('this is user does not exist in this group chat  ')
        }
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "-password")
            .populate("chat");
        res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });




  
  module.exports = {  sendMessage, allMessages };