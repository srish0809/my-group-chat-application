const Sequelize=require('sequelize');
const sequelize=require('../util/database')
const user=require('./user')

const GroupChat=sequelize.define('GroupChat',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
       
    },
    name:{
      type:Sequelize.STRING,
      allowNull:false
    },
   message:{
    type:Sequelize.STRING,
    allowNull:false
   }
})

module.exports=GroupChat;