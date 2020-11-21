const kegiatan = require('../model/kegiatanModel')
const importExcel= require('convert-excel-to-json')
const del = require('del')
const { QueryTypes } = require('sequelize');
const sq =  require('../connection');

class Controller{
    static listView(req, res){
      res.render('content-backoffice/kegiatan/list');    
    }

    static insert(req, res){
      res.render('content-backoffice/kegiatan/insert');       
    }

    static edit(req, res){
      res.render('content-backoffice/kegiatan/edit');    
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
            res.json(`berhasil delete id : ${id}`)
            
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
                    columnToKey:{A:'kegiatanPrioritas',B:'lokasi',C:'volume',D:'APBD',E:'DAUT',         F:'alokasiDanaKelurahan',G:'pelaksana',H:'kesesuaian',I:'keterangan',J:'jenisAnggaran,',K:'tahun',L:'approval',M:'jenisId'},
                    sheets :['Sheet1']
                    
                });
                
                kegiatan.bulkCreate(result.Sheet1,{returning:true})
                .then(data=>{
                    del(['./assets/excel/'+namafile])
                    res.json("input data sukses")
                })
                .catch(err=>{
                    res.json(err)
                })
                
                
            }
        }))
    }



}

module.exports=Controller