const waktu = require('../model/waktuModel')
const moment = require('moment')

function createWaktu() {
    waktu.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {},
    });
  }
  createWaktu();


class Controller{

    static updateWaktu(req,res){
        const{waktuAwalDewan,waktuAkhirDewan,waktuAwalSurveyor,waktuAkhirSurveyor}=req.body
        waktu.update({waktuAwalDewan,waktuAkhirDewan,waktuAwalSurveyor,waktuAkhirSurveyor},{where:{
            id:1
        }})
        .then(hasil=>{
            res.json("sukses")
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static checkWaktuDewan(req,res){
        waktu.findAll({where:{
            id:1
        }})
        .then(hasil=>{
            if(hasil[0].waktuAwalDewan<=moment() && hasil[0].waktuAkhirDewan>=moment()){
                res.json("sukses")
            }
            else{
                res.json("bukan waktu dewan")
            }
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static checkWaktuSurveyor(req,res){
        waktu.findAll({where:{
            id:1
        }})
        .then(hasil=>{
            if(hasil[0].waktuAwalSurveyor<=moment() && hasil[0].waktuAkhirSurveyor>=moment()){
                res.json("sukses")
            }
            else{
                res.json("bukan waktu surveyor")
            }
            
        })
        .catch(err=>{
            res.json(err)
        })
    }
}

module.exports=Controller