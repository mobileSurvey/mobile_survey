const sq=require('../connection')
const { QueryTypes } = require('sequelize');

class Controller{

    static listAll(req, res){
        res.render('content-backoffice/importData/list');    
       }

    static async insert(req, res){
      let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        res.render('content-backoffice/importData/insert',{kec}); 
      
      
      }

      static edit(req, res){
        res.render('content-backoffice/importData/edit');    
       }

}

module.exports=Controller