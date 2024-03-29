const { DataTypes } = require('sequelize');
const sq =  require('../connection');
const dewan = require('./dewanModel')

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
    },
    role :{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kelurahan:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    kecamatan:{
        type:DataTypes.STRING,
        defaultValue:""
    }
    
},
{
paranoid:true
});
Users.belongsTo(dewan,{
    foreignKey: {
      allowNull: true,
      defaultValue: null
    },constraints: false
  })
dewan.hasMany(Users,{
    foreignKey: {
      allowNull: true,
      defaultValue: null
    },constraints: false
  })

Users.sync({ alter: true })
module.exports = Users