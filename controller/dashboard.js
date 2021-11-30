const connection =  require('../connection');
// var fs = require('fs');
const { QueryTypes } = require('sequelize');

class Controller{

    static async dashboard(req, res){
        let tahun = new Date().getFullYear()
      
        let jalan = []
        let drainase = []
        let sumur = []
        let rth = []
        let sanitasi = []
        let bangunan = []
        let jembatan = []
        for(let i = tahun -3; i < tahun+3; i++){
            let data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=2`, { type: QueryTypes.SELECT }); 
            jalan.push({x:i, y: data[0].y})
             data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=1`, { type: QueryTypes.SELECT }); 
            drainase.push({x:i, y: data[0].y})
             data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=4`, { type: QueryTypes.SELECT }); 
            sumur.push({x:i, y: data[0].y})
             data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=6`, { type: QueryTypes.SELECT }); 
            rth.push({x:i, y: data[0].y})
             data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=7`, { type: QueryTypes.SELECT }); 
            sanitasi.push({x:i, y: data[0].y})
             data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=5`, { type: QueryTypes.SELECT }); 
            bangunan.push({x:i, y: data[0].y})
            data = await connection.query(`select count(id) as y from kegiatans where deletedAt is NULL and tahun= '${i}' and jeniId=3`, { type: QueryTypes.SELECT }); 
            jembatan.push({x:i, y: data[0].y})
        }

        if(req.query.tahun){
            tahun = req.query.tahun-1
        }
   console.log(jalan)

   let kecamatan  = await connection.query(`select b.nama_kecamatan as label, COUNT(a.id) as y, sum(approval) as disetujui, SUM(CASE WHEN a.SHAPE IS NOT NULL THEN 1 ELSE 0 END) as tersurvey from master_kecamatan b left join kegiatans a
   on b.nama_kecamatan =a.kec WHERE a.deletedAt is NULL and a.tahun= '${tahun+1}' group by b.nama_kecamatan`, { type: QueryTypes.SELECT }); 
        
   let jenis  = await connection.query(`select b.jenis as label, COUNT(a.id) as y, COALESCE(sum(approval),0)  as disetujui, SUM(CASE WHEN a.SHAPE IS NOT NULL THEN 1 ELSE 0 END) as tersurvey  from jenis b left join kegiatans a
   on b.id =a.jeniId WHERE a.deletedAt is NULL and a.tahun= '${tahun+1}' group by b.jenis order by b.id asc`, { type: QueryTypes.SELECT }); 

   let dprd  = await connection.query(`select b.nama as label, b.id, COUNT(a.id) as y, sum(approval) as disetujui, SUM(CASE WHEN a.SHAPE IS NOT NULL THEN 1 ELSE 0 END) as tersurvey from dewans b left join kegiatans a
   on b.id =a.dewanId and a.tahun= '${tahun+1}'  WHERE a.deletedAt IS NULL and b.deletedAt IS NULL  group by b.nama`, { type: QueryTypes.SELECT }); 
   
       res.render('content-backoffice/dashboard',{jalan, drainase, sumur,rth,sanitasi,bangunan, jembatan, kecamatan, jenis, user: req.session.user, tahun, dprd});    
      }


}

module.exports=Controller