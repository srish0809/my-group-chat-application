const express = require('express');
const router=express.Router();
const authenticate=require('../middleware/auth')

const Chat=require('../controllers/chat')

router.post('/groupmessage/send-message',authenticate.Authenticate, Chat.sendMessage)
router.get('/groupmessage/get-message',authenticate.Authenticate,Chat.getMessage)

module.exports=router;