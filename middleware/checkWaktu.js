const waktu = require('../model/waktuModel')
const moment = require('moment')

function checkWaktuDewan(){
    waktu.findAll({where:{
        id:1
    }})
    .then(hasil=>{
        if(hasil[0].waktuAwalSurveyor<=moment() && hasil[0].waktuAkhirSurveyor>=moment()){
            return true
        }
        else{
            return false
        }
        
    })
    .catch(err=>{
        res.json(err)
    })
}

function checkWaktuSurveyor(){
    waktu.findAll({where:{
        id:1
    }})
    .then(hasil=>{
        if(hasil[0].waktuAwalSurveyor<=moment() && hasil[0].waktuAkhirSurveyor>=moment()){
            return true
        }
        else{
            return false
        }
        
    })
    .catch(err=>{
        res.json(err)
    })
}


module.exports = {checkWaktuDewan,checkWaktuSurveyor}
