const express = require("express");
const messageContoller = require("../controllers/messageController");
const router = express.Router();

router.post("/schedulemessage", messageContoller.postScheduleMessage)

module.exports = router;