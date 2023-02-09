const GroupChat=require('../models/chat');
const user=require('../models/user')
const Group=require('../models/group')
const jwt=require('../middleware/auth');
const {Op}=require('sequelize');

require('dotenv').config();

exports.sendMessage= async(req,res) => {
     const name=req.user.name;
    const message=req.body.message;
    const userId=req.user.id;
     
        console.log(message);
    try {
           const data= await GroupChat.create({
            name:name,
            message:message,
            userId:userId
                       
        })
        
        res.status(201).json({message:message,success:true})
     
      
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error, success:false})
      
    }

}

exports.getMessage= async(req,res) => {
    try {
        const  lastMsgId = req.query.lastMsgId;
        console.log( lastMsgId);
        const message=await GroupChat.findAll({where:{id:{[Op.gt]: lastMsgId}}});// op.gt for operator use
        console.log(message);
        res.status(200).json({message:message,success:true})
   
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error, success:false})
    }
}





























// exports.getMessage= async(req,res) => {
//     try {
        
//     const message=await GroupChat.findAll();
//     res.status(200).json({message:message,success:true})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:error, success:false})
//     }
// }