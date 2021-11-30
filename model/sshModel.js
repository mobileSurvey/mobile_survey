const { DataTypes } = require('sequelize');
const sq =  require('../connection');


const ssh = sq.define('ssh',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    harga:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kode:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    satuan:{
        type:DataTypes.STRING,
        defaultValue:""
    }
},
{
paranoid:true
});



ssh.sync({ alter: true })
module.exports = ssh