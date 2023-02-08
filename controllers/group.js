const User=require('../models/user')
const group=require('../models/group')
const jwt=require('../middleware/auth');
require('dotenv').config();

exports.creatGroup=async (req,res) =>{
    try {
        const gname=req.body.gname;
        console.log(gname);
         if(!gname){
            throw new Error("Group Name is Mandatory!")
        }
        const response= await group.create({gname:gname});
        console.log(response);
        res.status(201).json({message:"Group Created Successfully"});
    } catch (error) {
        console.log(error);
res.status(500).json({error:error})
    }
}

exports.getUsers=async(req,res) => {
    try {
        const name=req.user.name;
        console.log(name);
        const data=User.findAll({where:{name:name}})
        console.log(data);
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error})
    }
}

