const { DataTypes } = require('sequelize');
const sq =  require('../connection');
const jenis = require('./jenisModel')

const kegiatan = sq.define('kegiatan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kegiatanPrioritas:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    lokasi:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    volume:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    APBD:{
        type:DataTypes.INTEGER
    },
    DAUT:{
        type:DataTypes.INTEGER
    },
    alokasiDanaKelurahan:{
        type:DataTypes.INTEGER
    },
    pelaksana:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kesesuaian:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    keterangan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    jenisAnggaran:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});

kegiatan.belongsTo(jenis)
jenis.hasMany(kegiatan)

kegiatan.sync({ alter: true })
module.exports = kegiatan