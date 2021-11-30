const { DataTypes } = require('sequelize');
const sq =  require('../connection');


const dewan = sq.define('dewan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama:{
        type:DataTypes.STRING,
        defaultValue:""
    }
},
{
paranoid:true
});



dewan.sync({ alter: true })
module.exports = dewan