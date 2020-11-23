const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const jenis = sq.define('jenis',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jenis:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    
},
{
paranoid:true
});

jenis.sync({ alter: true })
module.exports = jenis