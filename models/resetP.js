const Sequelize=require('sequelize');
const sequelize=require('../util/database')
const reset=sequelize.define('resetpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull: false,
        primaryKey:true,
       
    },
    active:Sequelize.BOOLEAN,
    expiresby:Sequelize.DATE

})

module.exports=reset;