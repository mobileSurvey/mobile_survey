const connection =  require('../connection');
// var fs = require('fs');
const { QueryTypes } = require('sequelize');
class Controller{

    static async index(req, res){

        let tahun = new Date().getFullYear()+1;
        let kec = await connection.query(`select kec as label, count(id) as y from kegiatans where deletedAt is NULL and tahun= '${tahun}' group by kec`, { type: QueryTypes.SELECT }); 
        let kecc = await connection.query("SELECT x(centroid(the_geom)) as xe, y(centroid(the_geom)) as ye,nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        
        res.render('content/index',{kec, kecc});    
        
       }
       static async get_kec_by_tahun(req, res){
        let data = await connection.query(`select b.nama_kecamatan as label, COUNT(a.id) as y from master_kecamatan b left join kegiatans a
        on b.nama_kecamatan =a.kec and a.deletedAt is NULL and a.tahun= '${req.params.tahun}' group by b.nama_kecamatan`, { type: QueryTypes.SELECT }); 
       
        res.json(data)
        
       }
       static async get_keg_by_jenis(req, res){
        let data = await connection.query(`select b.jenis as label, COUNT(a.id) as y from jenis b left join kegiatans a
        on b.id =a.jeniId and a.deletedAt is NULL and a.tahun= '${req.params.tahun}'  group by b.jenis order by b.id`, { type: QueryTypes.SELECT }); 
       
        res.json(data)
        
       }
       static async get_kel_bykec(req, res){
        let data = await connection.query("select kel as label, count(id) as y from kegiatans where deletedAt is NULL and kec='"+req.params.kec+"' group by kel", { type: QueryTypes.SELECT }); 
        
        res.json(data)
        
       }

       static async kegiatan_by_kel(req, res){
        let data = await connection.query("select a.*, b.jenis, IF(a.kesesuaian=0, 'TIDAK SESUAI', 'SESUAI') as namakesesuaian from kegiatans a left join jenis b on a.jeniId=b.id where a.deletedAt is NULL and a.kel='"+req.params.kel+"'", { type: QueryTypes.SELECT }); 
        
        res.json(data)
        
       }
       static async kegiatan_by_jenis(req, res){
        let data = await connection.query("select a.*, b.jenis, IF(a.kesesuaian=0, 'TIDAK SESUAI', 'SESUAI') as namakesesuaian from kegiatans a left join jenis b on a.jeniId=b.id where a.deletedAt is NULL and b.jenis='"+req.params.jenis+"' and a.tahun="+req.params.tahun, { type: QueryTypes.SELECT }); 
        
        res.json(data)
        
       }
       static async kegiatan_by_kec(req, res){
        let data = await connection.query("select a.*, b.jenis, IF(a.kesesuaian=0, 'TIDAK SESUAI', 'SESUAI') as namakesesuaian from kegiatans a left join jenis b on a.jeniId=b.id where a.deletedAt is NULL and a.kec='"+req.params.kec+"' and a.tahun="+req.params.tahun, { type: QueryTypes.SELECT }); 
        
        res.json(data)
        
       }
}

module.exports=Controller