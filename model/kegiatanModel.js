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
    kec:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kel:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    volume:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    pelaksana:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kesesuaian:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    keterangan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    jenisAnggaran:{
        type:DataTypes.STRING,
        defaultValue:""
    },
     jumlahAnggaran:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    foto1:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    foto2:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    foto3:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    tahun:{
        type:DataTypes.INTEGER
    },
    approval:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    SHAPE:{
        type:DataTypes.GEOMETRY
    }
    
},
{
paranoid:true
});

kegiatan.belongsTo(jenis)
jenis.hasMany(kegiatan)

kegiatan.sync({ alter: true })
module.exports = kegiatan