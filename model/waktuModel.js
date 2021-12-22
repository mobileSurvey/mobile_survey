const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const waktu = sq.define('waktu',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    waktuAwalDewan:{
        type:DataTypes.DATE
    },
    waktuAkhirDewan:{
        type:DataTypes.DATE
    },
    waktuAwalSurveyor:{
        type:DataTypes.DATE
    },
    waktuAkhirSurveyor:{
        type:DataTypes.DATE
    }
    
},
{
paranoid:true
});


waktu.sync({ alter: true })
module.exports = waktu