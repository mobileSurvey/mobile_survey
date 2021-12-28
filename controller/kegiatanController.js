const kegiatan = require('../model/kegiatanModel')
const importExcel= require('convert-excel-to-json')
const del = require('del')
const { QueryTypes, Op } = require('sequelize');
const sq =  require('../connection');
var fs = require('fs');
const jenis = require('../model/jenisModel')
const ssh = require('../model/sshModel')
var dbgeo = require("dbgeo");
var wkx = require('wkx');
const sharp = require('sharp');
const kegiatan2 = require('../model/kegiatanModel2')


class Controller{
    static exportExcel(req, res){
        let where = {}
        if(req.query.kec){
            where.kec = req.query.kec
        }
        if(req.query.kel){
            where.kel = req.query.kel
        }
        if(req.query.dewanId){
            where.dewanId = req.query.dewanId
        }
        if(req.query.approval){
            where.approval = req.query.approval
        }
        console.log(where);
        kegiatan.findAll({
            where:where,
            include: { model: jenis }
        })
        .then(async respon=>{
         
            res.render('content-backoffice/kegiatan/export_excel', {respon});    
        })
    
    }

    static cetak(req, res){
       
        kegiatan.findAll({
            where:{
                id: req.params.id
            },
            include: { model: jenis }
        })
        .then(async respon=>{
            let wkt = await sq.query(`SELECT asWkt(SHAPE) as wkt FROM kegiatans where id=${req.params.id}`, { type: QueryTypes.SELECT }); 
            let wkt2 = await sq.query(`SELECT asWkt(PETA) as wkt2 FROM kegiatans where id=${req.params.id}`, { type: QueryTypes.SELECT }); 
            res.render('content-backoffice/kegiatan/cetak', {respon, wkt, wkt2});    
        })
    
    }

    


    static async dprd(req, res){
        let ata = await sq.query(`SELECT a.*, b.jenis FROM kegiatans a join jenis b on a.jeniId = b.id where a.dewanId=${req.params.id} and a.tahun=${Number(req.params.tahun)+1}`, { type: QueryTypes.SELECT }); 
         
        res.render('content-backoffice/dprd/list',{user: req.session.user, ata}); 
    
    }

    static cetak_laporan(req, res){
        let where = {}
        if(req.query.kec){
            where.kec = req.query.kec
        }
        if(req.query.kel){
            where.kel = req.query.kel
        }
        if(req.query.dewanId){
            where.dewanId = req.query.dewanId
        }
        if(req.query.approval){
            where.approval = req.query.approval
        }
        kegiatan.findAll({
            where:where,
            include: { model: jenis }
        })
        .then(async respon=>{
         
            res.render('content-backoffice/kegiatan/cetak_laporan', {respon, user: req.session.user});    
        })
    
    }

    static async listView(req, res){
        // kegiatan.findAll({
        //     include: { model: jenis }
        // })
        // .then(async respon=>{
        //     // let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
            
        //     res.json({data: respon})
     
        // })
        // .catch(err=>{
        //     res.json(err)
        // })
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        let dewan = await sq.query("SELECT nama, id FROM `dewans` where deletedAt is null", { type: QueryTypes.SELECT }); 
        res.render('content-backoffice/kegiatan/list',{kec, user: req.session.user, dewan});    
 
    }

    static async listJson(req, res){
        let where = {
            tahun: req.params.tahun
        }
        console.log(req.query)
        if(req.query.kec&&req.query.kec!='null'&&req.query.kec!='undefined'){
            where.kec = req.query.kec
         }
         if(req.query.kel&&req.query.kel!='null'&&req.query.kel!='undefined'){
            where.kel = req.query.kel
         }
         if(req.query.dewan&&req.query.dewan!='null'&&req.query.dewan!='undefined'){
            where.dewanId = req.query.dewan
         }
        if(req.session.user.role=='Surveyor'){
                where.kel = req.session.user.kelurahan
        }
        if(req.session.user.role=='Dewan'){
            where.dewanId = req.session.user.dewanId
    }
        kegiatan.findAll({
            where:where,
            include: { model: jenis }
        })
        .then(async respon=>{
            // let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
            
            res.json({data: respon})
            // res.render('content-backoffice/kegiatan/list',{respon, kec});    
        })
        .catch(err=>{
            res.json(err)
        })
 
    }

    static async insert(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        let jenisPekerjaan = await jenis.findAll();
        res.render('content-backoffice/kegiatan/insert',{kec,jenisPekerjaan, user: req.session.user});   
      }   
    

    static async edit(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
        let jenisPekerjaan = await jenis.findAll();
        kegiatan.findAll({
            where:{
                id :req.params.id
            }
        },{returning:true})
        .then(async respon=>{
            let kel = await sq.query("SELECT nama_kelurahan, id_kelurahan FROM `master_kelurahan` WHERE kec='"+respon[0].kec+"'", { type: QueryTypes.SELECT }); 
             
            let wkt = await sq.query(`SELECT asWkt(SHAPE) as wkt FROM kegiatans where id=${req.params.id}`, { type: QueryTypes.SELECT }); 
            let wkt2 = await sq.query(`SELECT asWkt(PETA) as wkt2 FROM kegiatans where id=${req.params.id}`, { type: QueryTypes.SELECT }); 
           let data =  await ssh.findAll()
           
           kegiatan2.findAll({where:{
               id:req.params.id
           }})
           .then(respon2=>{
            res.render('content-backoffice/kegiatan/edit', {respon,respon2, kec, kel, jenisPekerjaan, wkt, wkt2, ssh:data, user: req.session.user}); 
           })
           
            // res.json(wkt)
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static async jsonSSH(req, res){
        let data =  await ssh.findAll()
        res.json(data)
    }

    static async kel_resume(req, res){
        let kel  = await sq.query(`select b.nama_kelurahan as label, COUNT(a.id) as y, sum(approval) as tersurvey from master_kelurahan b left join kegiatans a
        on b.nama_kelurahan =a.kel and a.deletedAt is NULL and a.tahun= '${req.params.tahun}' and a.kec= '${req.params.kec}'  group by b.nama_kelurahan`, { type: QueryTypes.SELECT }); 
            // console.log(`select b.nama_kelurahan as label, COUNT(a.id) as y, sum(approval) as tersurvey from master_kelurahan b left join kegiatans a
            // on b.nama_kelurahan =a.kel and a.deletedAt is NULL and a.tahun= '${req.params.tahun}' and a.kec= '${req.params.kec}'  group by b.nama_kelurahan`)
        res.json(kel)
    }

    static async kel_resume_setuju(req, res){
        let kel  = await sq.query(`select b.nama_kelurahan as label, sum(approval) as y from master_kelurahan b left join kegiatans a
        on b.nama_kelurahan =a.kel and a.deletedAt is NULL and a.tahun= '${req.params.tahun}' and a.kec= '${req.params.kec}'  group by b.nama_kelurahan`, { type: QueryTypes.SELECT }); 
            // console.log(`select b.nama_kelurahan as label, COUNT(a.id) as y, sum(approval) as tersurvey from master_kelurahan b left join kegiatans a
            // on b.nama_kelurahan =a.kel and a.deletedAt is NULL and a.tahun= '${req.params.tahun}' and a.kec= '${req.params.kec}'  group by b.nama_kelurahan`)
        res.json(kel)
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
        let kel = await sq.query("SELECT x(centroid(the_geom)) as xe, y(centroid(the_geom)) as ye, nama_kelurahan, id_kelurahan, kec FROM `master_kelurahan` "+a, { type: QueryTypes.SELECT }); 
        res.json(kel)
      }

    static submit_insert(req, res){
        //   console.log(req.files.foto1)
        if(req.body['xe'] && req.body['ye']){
            req.body['SHAPE'] = { type: 'Point', coordinates: [req.body['xe'],req.body['ye']]};
        }
     if(req.files){
        if(req.files.foto1){
            let filenama =Date.now()+req.files.foto1.name; 
            fs.writeFileSync('./assets/asli/'+filenama, req.files.foto1.data);
          
                sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                    if(err){
                        console.log(err);
                    }
                })
            req.body['foto1']= filenama;
          }
          if(req.files.foto2){
            let filenama =Date.now()+req.files.foto2.name; 
            fs.writeFileSync('./assets/asli/'+filenama, req.files.foto2.data);
            sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                if(err){
                    console.log(err);
                }
            })
            req.body['foto2']= filenama;
          }
          if(req.files.foto3){
            let filenama =Date.now()+req.files.foto3.name; 
            fs.writeFileSync('./assets/asli/'+filenama, req.files.foto3.data);
            sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                if(err){
                    console.log(err);
                }
            })
            req.body['foto3']= filenama;
          }
         
     }
 
        kegiatan.create(req.body).then(respon =>{
            // console.log(respon)
           
            req.body.id=respon.dataValues.id
            console.log(req.body)
            kegiatan2.create(req.body).then(respon2=>{
                res.redirect('/kegiatan/list')
            })
            
         })
         .catch(err=>{
             res.json(err)
         })
      }



    static submit_edit(req, res){
        if(req.body['xe'] && req.body['ye']){
            req.body['SHAPE'] = { type: 'Point', coordinates: [req.body['xe'],req.body['ye']]};
        }
        if(req.body['PETA'] ){
            let geometry = wkx.Geometry.parse(req.body['PETA']);
            req.body['PETA'] = geometry.toGeoJSON();
        }else{
            delete req.body.PETA
        }
        if(req.files){
            if(req.files.foto1){
                let filenama =Date.now()+req.files.foto1.name; 
                fs.writeFileSync('./assets/asli/'+filenama, req.files.foto1.data);
                sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                    if(err){
                        console.log(err);
                    }
                })
                req.body['foto1']= filenama;
              }
              if(req.files.foto2){
                let filenama =Date.now()+req.files.foto2.name; 
                fs.writeFileSync('./assets/asli/'+filenama, req.files.foto2.data);
                sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                    if(err){
                        console.log(err);
                    }
                })
                req.body['foto2']= filenama;
              }
              if(req.files.foto3){
                let filenama =Date.now()+req.files.foto3.name; 
                fs.writeFileSync('./assets/asli/'+filenama, req.files.foto3.data);
                sharp('./assets/asli/'+filenama).resize(1024, 800, {fit: 'contain'}).toFile('./assets/foto/'+filenama, function(err){
                    if(err){
                        console.log(err);
                    }
                })
                req.body['foto3']= filenama;
              }
        }
    //    console.log(req.body)
        kegiatan.update(req.body,{
            where :{
                id:req.body.id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            // console.log(respon)
            // res.redirect('/kegiatan/list')
            if(req.session.user.role=='Surveyor' || req.session.user.role=='Admin'){
                 res.redirect('/kegiatan/list')
            }
            else{
                kegiatan2.update(req.body,{
                    where:{
                        id:req.body.id
                    }
                })
            }
        })
        .catch(err=>{
            res.json(err,'abc')
        })
    }






    static async update_status(req, res){
        await   kegiatan.update({approval: req.params.approval},{
            where :{
                id:req.params.idkeg
            },
            returning: true,
            plain:true
        })

        res.json({status:'berhasil'})
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
      static base64_encode(file) {
        // read binary data
        // var bitmap = fs.readFileSync('./assets/foto/'+file);
        // // convert binary data to base64 encoded string
        // return new Buffer(bitmap).toString('base64');
        let fileContents
        try {
            fileContents = fs.readFileSync('./assets/foto/'+file, 'base64')
          } catch (err) {
            fileContents = ""
            console.log(err)
          }
       
       return fileContents
    }
    
      static list(req,res){
        const{id}=req.params
        kegiatan.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
     
            if(respon[0].foto1){
                respon[0].foto1 =  Controller.base64_encode(respon[0].foto1)
            }
            if(respon[0].foto2){
                respon[0].foto2 =  Controller.base64_encode(respon[0].foto2)
            }
            if(respon[0].foto3){
                respon[0].foto3 =  Controller.base64_encode(respon[0].foto3)
            }
            //  console.log(respon)
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
            respon.forEach( function(itm, idx){
                // console.log(respon[idx])
                // if(respon[idx].foto1){
                //     respon[idx].foto1 =  Controller.base64_encode(respon[idx].foto1)
                // }
                // if(respon[idx].foto2){
                //     respon[idx].foto2 =  Controller.base64_encode(respon[idx].foto2)
                // }
                // if(respon[idx].foto3){
                //     respon[idx].foto3 =  Controller.base64_encode(respon[idx].foto3)
                // }
            })
            
            res.json({respon})
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })
    }

    static listForAppDewan(req,res){
       
        kegiatan.findAll({
            where:{
                dewanId :req.params.dewanId,
                tahun: req.params.tahun
            }
        })
        .then(respon=>{
            respon.forEach( function(itm, idx){
                // console.log(respon[idx])
                // if(respon[idx].foto1){
                //     respon[idx].foto1 =  Controller.base64_encode(respon[idx].foto1)
                // }
                // if(respon[idx].foto2){
                //     respon[idx].foto2 =  Controller.base64_encode(respon[idx].foto2)
                // }
                // if(respon[idx].foto3){
                //     respon[idx].foto3 =  Controller.base64_encode(respon[idx].foto3)
                // }
            })
            
            res.json({respon})
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })
    }
    static base64_decode(base64Image, file) {
        let buff = new Buffer(base64Image, 'base64');
            fs.writeFileSync(file, buff);
        // fs.writeFileSync(file,base64Image);
         console.log('******** File created from base64 encoded string ********');
      
      }
    static update(req,res){
        // console.log('abcd')
        const {id}=req.params
        const post= req.body
         post['SHAPE'] = { type: 'Point', coordinates: [post['xe'],post['ye']]};
         delete post['xe']
         delete post['ye']
        // console.log(post);
         if(post['foto1']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto1'],'./assets/foto/'+filenama);
            post['foto1'] = filenama;
         }else{
             delete post['foto1']
         }
         if(post['foto2']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto2'],'./assets/foto/'+filenama);
            post['foto2'] = filenama;
         }else{
            delete post['foto2']
        }
         if(post['foto3']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto3'],'./assets/foto/'+filenama);
            post['foto3'] = filenama;
         }else{
            delete post['foto3']
        }
    
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
    static async listDitolak(req, res) {
        res.render('content-backoffice/kegiatan/list_ditolak', { user: req.session.user });
    }
    
    static insertApp(req,res){
        // console.log('abcd')
    
        const post= req.body
         post['SHAPE'] = { type: 'Point', coordinates: [post['xe'],post['ye']]};
         delete post['xe']
         delete post['ye']
        // console.log(post);
         if(post['foto1']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto1'],'./assets/foto/'+filenama);
            post['foto1'] = filenama;
         }else{
             delete post['foto1']
         }
         if(post['foto2']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto2'],'./assets/foto/'+filenama);
            post['foto2'] = filenama;
         }else{
            delete post['foto2']
        }
         if(post['foto3']){
            var x = Math.floor((Math.random() * 260) + 105);
            let filenama =Date.now()+x+'.jpeg'; 
            Controller.base64_decode(post['foto3'],'./assets/foto/'+filenama);
            post['foto3'] = filenama;
         }else{
            delete post['foto3']
        }
    
        kegiatan.create(post,{
            returning: true,
            plain:true
        })
        .then(respon=>{
            // res.json(respon)
            if(post["role"]=="Dewan"){
                kegiatan2.create(post,{
                    returning:true,
                    plain:true
                })
                .then(respon2=>{
                    req.body = req.body.filter(el=>el.role !=="Dewan")
                    res.json(respon2)
                })
            }
            else{
                res.json(respon)
            }
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
                    header     :   {rows:3},
                    columnToKey:{
                        B:'kegiatanPrioritas',
                        C:'lokasi',
                        D:'volume',
                        E:'satuan',
                         F:'jumlahAnggaran',
                         G:'pelaksana',
                         I:'jeniId'},
                    sheets :['Sheet1']
                    
                });
              

                var hasil = result.Sheet1.map(function(el) {
                    var o = Object.assign({}, el);
                    o.kec = req.body.kec;
                    o.kel = req.body.kel;
                    if(req.body.dewanId){
                        o.dewanId = req.body.dewanId;
                    }
                    
                    o.tahun = req.body.tahun;
                    o.volume2 = o.volume;
                    o.jumlahAnggaran2 = o.jumlahAnggaran;
                    return o;
                  })

                kegiatan.bulkCreate(hasil,{returning:true})
                .then(data=>{
                    kegiatan2.bulkCreate(hasil,{returning:true})
                    .then(data2=>{
                        del(['./assets/excel/'+namafile])
                        res.redirect('/kegiatan/list')
                    })
                   
                   
                })
                .catch(err=>{
                    res.json(err)
                })
                
                
            }
        }))
    }

    static insertExcelDewan(req,res){
      
        let file = req.files.excelFile;
        let namafile = Date.now() + file.name
        

        file.mv('./assets/excel/'+namafile,(async err=>{
            if(err){
                res.json(err)
            }
            else{
                let result =  await importExcel({
                    sourceFile :'./assets/excel/'+namafile,
                    header     :   {rows:3},
                    columnToKey:{
                        B:'kec',
                        C:'kel',
                        D:'kegiatanPrioritas',
                        E:'lokasi',
                        F:'volume',
                        G:'satuan', 
                        H:'jumlahAnggaran',
                        I:'pelaksana',
                        K:'jeniId'},
                    sheets :['Sheet1']
                
                });
              

                var hasil = result.Sheet1.map(function(el) {
                    var o = Object.assign({}, el);
                    // o.kec = req.body.kec;
                    // o.kel = req.body.kel;
                    if(req.body.dewanId){
                        o.dewanId = req.body.dewanId;
                    }
                    
                    o.tahun = req.body.tahun;
                    o.volume2 = o.volume;
                    o.jumlahAnggaran2 = o.jumlahAnggaran;
                    return o;
                  })

                kegiatan.bulkCreate(hasil,{returning:true})
                .then(data=>{
                   kegiatan2.bulkCreate(hasil,{returning:true})
                   .then(data2=>{
                    del(['./assets/excel/'+namafile])
                    res.redirect('/kegiatan/list')
                   })
                })
                .catch(err=>{
                    res.json(err)
                })
                
                
            }
        }))
    }

    static async jumlahAnggaran(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('sum', sq.col('jumlahAnggaran')), 'totalAnggaran']],
            raw: true,
            where:{
                kel :req.params.kel,
                tahun: req.params.tahun
            }
           
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async jumlahAnggaranDewan(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('sum', sq.col('jumlahAnggaran')), 'totalAnggaran']],
            raw: true,
            where:{
                dewanId :req.params.dewanId,
                tahun: req.params.tahun
            }
           
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async totalApproval(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalApproval']],
            raw: true,
            where:{
                approval :1,
                kel :req.params.kel,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async totalTersurvey(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalTersurvey']],
            raw: true,
            where:{
                SHAPE: {
                    [Op.ne]: null
                  },
                kel :req.params.kel,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async totalKegiatan(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalKegiatan']],
            raw: true,
            where:{
                kel :req.params.kel,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              console.log(respon)
              res.json(respon)
          })
    }
    static async totalApprovalDewan(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalApproval']],
            raw: true,
            where:{
                approval :1,
                dewanId :req.params.dewanId,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async totalTersurveyDewan(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalTersurvey']],
            raw: true,
            where:{
                SHAPE: {
                    [Op.ne]: null
                  },
                dewanId :req.params.dewanId,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              res.json(respon)
          })
    }

    static async totalKegiatanDewan(req, res){
        kegiatan.findAll({
            attributes: [[sq.fn('count', sq.col('id')), 'totalKegiatan']],
            raw: true,
            where:{
                dewanId :req.params.dewanId,
                tahun: req.params.tahun
            }
          }).then(respon=>{
              console.log(respon)
              res.json(respon)
          })
    }
    static async peta(req, res){
        let pet = await sq.query("SELECT asWkt(a.SHAPE) as geometry, b.jenis, a.kegiatanPrioritas, a.jumlahAnggaran, a.foto1, a.kel FROM kegiatans a join jenis b on a.jeniId = b.id where a.SHAPE IS NOT NULL and a.tahun="+req.params.tahun, { type: QueryTypes.SELECT }); 
     
        dbgeo.parse(pet,{  
            "outputFormat": "topojson",
            "geometryColumn": "geometry",
            "geometryType": "wkt"
          },function(error, result) {
            if (error) {
                //  return console.log(error);
                res.json({message: err})
            }
            // This will log a valid GeoJSON object
           // console.log(result)  
            res.send(JSON.stringify(result))
          });
    }

    static async jalan(req, res){
        let pet = await sq.query("SELECT asWkt(a.the_geom) as geometry,  a.nama_ruas FROM daftar_induk a", { type: QueryTypes.SELECT }); 
     
        dbgeo.parse(pet,{  
            "outputFormat": "topojson",
            "geometryColumn": "geometry",
            "geometryType": "wkt"
          },function(error, result) {
            if (error) {
                //  return console.log(error);
                res.json({message: err})
            }
            // This will log a valid GeoJSON object
           // console.log(result)  
            res.send(JSON.stringify(result))
          });
    }


}

module.exports=Controller