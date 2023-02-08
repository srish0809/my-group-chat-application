const Sequelize=require('sequelize');
const sequelize=require('../util/database')

const Group= sequelize.define('group',{

    id:{
        type:Sequelize.INTEGER,
autoIncrement:true,
allowNull:false,
primaryKey:true
    },

    gname:{
type :Sequelize.STRING,
allowNull:false
    },
    idadmin:{
        type:Sequelize.STRING
    }

})
module.exports=Group;