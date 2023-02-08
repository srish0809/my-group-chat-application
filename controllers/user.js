const User=require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(id,name){
  return jwt.sign({userId:id , name:name},process.env.SECRET_KEY)
}


exports.signup= async(req,res) => {
    try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const phn=req.body.phn;

    if(!email){
      throw new Error('Email is mandatory!')
    }

  const existinguser= await User.findOne({where:{email:email}})
   
    if(existinguser)
    {
      return res.status(400).json({message:"User already exists!"})
    }
   
    const saltrounds=10;
    bcrypt.hash(password, saltrounds, async(err,hash) => {
  console.log(err);
  const data= await User.create({
    name:name,
    email:email,
    password:hash,
    phn:phn
})
  
 //console.log(data);
     return res.status(201).json({message:"Successfully NewUser Created"})
    }) 
    }
    
  
    catch(error)
    {
console.log(error);
res.status(500).json({error:error})
    }
}


exports.login= async(req,res) =>{

    try {

      const {email, password}=req.body;
      if(!email){
        throw new Error('email is mandatory')
      }
      
      const user=  await User.findAll({where:{email:email}})
          if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
           if(err){
            throw new Error('Something went wrong')
           }
           if(result===true){
            res.status(200).json({success:true,message:"Login successful", token:generateAccessToken(user[0].id,user[0].name)})
           }
          
           else{

            return res.status(400).json({success:false, message:"Password Incorrect"})
            }
          
            })
          }
            else
            {
              return res.status(404).json({success:false,message:"User doesn't exist, First Signup!"})
            }
       
          }
        
    catch (error) {
      res.status(500).json({message:error, success:false})
        
    }
}

