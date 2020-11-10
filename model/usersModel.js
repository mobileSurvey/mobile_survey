const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const Users = sq.define('Users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    password:{
        type:DataTypes.STRING,
        defaultValue:''
    }
    
},
{
paranoid:true
});

Users.sync({ alter: true })
module.exports = Users