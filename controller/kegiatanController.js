const kegiatan = require('../model/kegiatanModel')
const importExcel= require('convert-excel-to-json')
const del = require('del')
const { QueryTypes } = require('sequelize');
const sq =  require('../connection');

class Controller{
    static listView(req, res){
        kegiatan.findAll()
        .then(respon=>{
      
            res.render('content-backoffice/kegiatan/list',{respon});    
        })
        .catch(err=>{
            res.json(err)
        })
 
    }

    static async insert(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        
        res.render('content-backoffice/kegiatan/insert',{kec});   
      }   
    

    static async edit(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        kegiatan.findAll({
            where:{
                id :req.params.id
            }
        },{returning:true})
        .then(async respon=>{
            let kel = await sq.query("SELECT nama_kelurahan, id_kelurahan FROM `master_kelurahan` WHERE kec='"+respon[0].kec+"'", { type: QueryTypes.SELECT }); 
            res.render('content-backoffice/kegiatan/edit', {respon, kec, kel});  
        })
        .catch(err=>{
            res.json(err)
        })
    
    }

 static async kec(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        res.json(kec)
      }

       static async kel(req, res){
           let a =''
           if(req.params.kec!=0){
               a = "WHERE kec='"+req.params.kec+"'";
           }
        let kel = await sq.query("SELECT nama_kelurahan, id_kelurahan FROM `master_kelurahan` "+a, { type: QueryTypes.SELECT }); 
        res.json(kel)
      }

      

    static create(req, res){
        kegiatan.findAll({
            where:{
                kegiatanPrioritas:req.body.kegiatanPrioritas
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                kegiatan.create(req.body).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
         
        
      }

      static list(req,res){
        const{id}=req.params
        kegiatan.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listAll(req,res){
       
        kegiatan.findAll()
        .then(respon=>{
          
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static listForApp(req,res){
       
        kegiatan.findAll({
            where:{
                kel :req.params.kel,
                tahun: req.params.tahun
            }
        })
        .then(respon=>{
          
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const post= req.body
         post['SHAPE'] = { type: 'Point', coordinates: [post['xe'],post['ye']]};
         delete post['xe']
         delete post['ye']
        kegiatan.update(post,{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }


    static delete(req,res){
        const{id}= req.params
        kegiatan.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            // res.json(`berhasil delete id : ${id}`)
            res.redirect('/kegiatan/list')
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static insertExcel(req,res){
      
        let file = req.files.excelFile;
        let namafile = Date.now() + file.name
        

        file.mv('./assets/excel/'+namafile,(async err=>{
            if(err){
                res.json(err)
            }
            else{
                let result =  await importExcel({
                    sourceFile :'./assets/excel/'+namafile,
                    header     :   {rows:1},
                    columnToKey:{A:'kegiatanPrioritas',B:'lokasi',C:'volume',D:'jumlahAnggaran',E:'pelaksana', F:'kesesuaian',G:'keterangan',H:'jenisAnggaran',I:'tahun',J:'jenisId'},
                    sheets :['Sheet1']
                    
                });
              

                var hasil = result.Sheet1.map(function(el) {
                    var o = Object.assign({}, el);
                    o.kec = req.body.kec;
                    o.kel = req.body.kel;
                    return o;
                  })

                kegiatan.bulkCreate(hasil,{returning:true})
                .then(data=>{
                    del(['./assets/excel/'+namafile])
                   res.redirect('/kegiatan/list')
                })
                .catch(err=>{
                    res.json(err)
                })
                
                
            }
        }))
    }



}

module.exports=Controller