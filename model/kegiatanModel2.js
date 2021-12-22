const { DataTypes } = require('sequelize');
const sq =  require('../connection');
const jenis = require('./jenisModel')
const ssh = require('./sshModel')
const dewan = require('./dewanModel')

const kegiatan2 = sq.define('kegiatan2',{
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
    volume2:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    satuan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    hargaSatuan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    panjang:{
        type:DataTypes.DOUBLE,
        defaultValue:0.00
    },
    lebar:{
        type:DataTypes.DOUBLE,
        defaultValue:0.00
    },
    tinggi:{
        type:DataTypes.DOUBLE,
        defaultValue:0.00
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
    jumlahAnggaran2:{
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
    cp:{
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
    },
    PETA:{
        type:DataTypes.GEOMETRY
    },
    id_kegiatan:{
        type:DataTypes.INTEGER
    }
    
},
{
paranoid:true
});

kegiatan2.belongsTo(jenis)
jenis.hasMany(kegiatan2)

kegiatan2.belongsTo(ssh)
ssh.hasMany(kegiatan2)

kegiatan2.belongsTo(dewan)
dewan.hasMany(kegiatan2)

kegiatan2.sync({ alter: true })
module.exports = kegiatan2