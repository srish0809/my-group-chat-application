const express=require('express');
const router=express.Router();
const group=require('../controllers/group');
const authenticate=require('../middleware/auth')

router.post('/creategroup',authenticate.Authenticate, group.creatGroup)
router.get('/getuserlist',authenticate.Authenticate, group.getUsers)

module.exports=router;