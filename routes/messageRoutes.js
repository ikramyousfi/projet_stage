const express = require("express");
const {sendMessage, allMessages} = require("../controllers/messageCtr");
const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:chatId").get( allMessages);

module.exports = router;