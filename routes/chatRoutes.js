const express = require("express");
const {accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup} = require("../controllers/chatCtr");
const router = express.Router();

router.route("/").post( accessChat);
router.route("/").get( fetchChats); //all groups and chat between 2ppl
router.route("/group").post( createGroupChat);
router.route("/rename").patch( renameGroup);
router.route("/groupremovefrom").patch( removeFromGroup);
router.route("/groupadd").patch( addToGroup);

module.exports = router;