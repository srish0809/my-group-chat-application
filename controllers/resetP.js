require('dotenv').config();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User=require('../models/user')
const ForgotPassword=require('../models/resetP')

exports.forgotpassword=async(req,res) => {
    try {
        const email=req.body.email;
        console.log(email);
        const existinguser= await User.findOne({where:{email:email}})
       
        console.log(existinguser);
   
    if(existinguser)
    {
      const id=uuid.v4();
      existinguser.createForgotPassword({id,active:true})
      .catch(err =>{
        throw new Error(err)
      })

      const msg={
        to:email,
        from:'srashtisoni2001.ss@gmail.com',
        subject:'You can change your password now',
        text:'that too very easily',
        html:`<a href="http://localhost:3000/password/resetpassword/${id}">Reset Password</a>`

      }
      console.log(msg);
      return res.status(201).json({message:'Done', success:true, link:`http://localhost:3000/password/resetpassword/${id}`})
    }
    else{
        throw new Error('User doesnt exist')
    }
    } catch (error) {
        return res.status(500).json({message:error,success:false})
       
    }
}

exports.resetpassword = async (req, res) => {
  console.log('hii')
  const id =  req.params.id;
  console.log(id);
  ForgotPassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
     if (forgotpasswordrequest) {
          forgotpasswordrequest.update({ isActive: false });
          res.status(200).send(`<html>
                                <center>  <form action="/password/updatepassword/${id}" method="get">
                                      <label for="newpassword">Enter New password</label><br>
                                      <input name="newpassword" type="password"></input>
                                      <button>Reset Password</button>
                                  </form></center>
                              </html>`
          );
          res.end();
      

      }
  }).catch((err)=>{
      console.error(err)
      return res.json({ message: err, sucess: false });
})
}

exports.updatepassword = async(req, res) => {

  try {
console.log(req.query.newpassword);
      const  newpassword  = req.query.newpassword;
      console.log(".............."+newpassword);
      
      const { resetpasswordid } = req.params;
      console.log(resetpasswordid)
      ForgotPassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
          User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
               console.log('userDetails', user)
              if(user) {
                    const saltRounds = 10;
                     bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                          // Store hash in your password DB.
                          if(err){
                              console.log(err);
                              throw new Error(err);
                          }
                         
                          user.update({ password: hash }).then(() => {
                            window.location('../login/login.html')
                       //  return  window.location.href = 'http://localhost:3000/login/login.html'
                               return res.status(201).json({message: 'Successfuly update the new password'})
                          })
                      });
                  }
           else{
              return res.status(404).json({ error: 'No user Exists', success: false})
          }
          })
      })
  } catch(error){
      return res.status(403).json({ error, success: false } )
  }

}


