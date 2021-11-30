const sq=require('../connection')
const { QueryTypes } = require('sequelize');

class Controller{

    static listAll(req, res){
        res.render('content-backoffice/importData/list',{user: req.session.user});    
       }

    static async insert(req, res){
      let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
      let dewan = await sq.query("SELECT nama, id FROM `dewans`", { type: QueryTypes.SELECT }); 
        res.render('content-backoffice/importData/insert',{kec, user: req.session.user, dewan}); 
      
      
      }

      static edit(req, res){
        res.render('content-backoffice/importData/edit',{ user: req.session.user});    
       }

}

module.exports=Controller