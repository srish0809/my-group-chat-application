const jwt =require('jsonwebtoken')
const User=require('../models/user')

exports.Authenticate= async(req,res,next) => {
    try {
        const token= req.headers.authorization;
        console.log(token);
        const decodedtoken=jwt.verify(token,process.env.SECRET_KEY);
        console.log('userId>>>>>',decodedtoken.userId);
     
    const user=  await User.findByPk(decodedtoken.userId)
       req.user=user;
            next();
          }
    catch (error) {
        console.log(error);
       }
}