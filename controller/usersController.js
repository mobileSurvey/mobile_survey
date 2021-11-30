const usersModel = require('../model/usersModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const sq =  require('../connection');
const { QueryTypes } = require('sequelize');

class Controller{


    static listAll(req, res){
        let where = {
           
        }
        if(req.session.user.role=='Surveyor'){
                where.id = req.session.user.id
        }
        usersModel.findAll({where})
        .then(respon=>{
            res.render('content-backoffice/user/list', {respon, user: req.session.user});  
        })
        .catch(err=>{
            res.json(err)
        })
         
       }

    static async insert(req, res){
        let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 
      
       res.render('content-backoffice/user/insert', {kec, user: req.session.user});    
      }

      static async edit(req, res){
        const{id}=req.params
        usersModel.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(async (respon)=>{
            let kec = await sq.query("SELECT nama_kecamatan, id_kecamatan FROM `master_kecamatan`", { type: QueryTypes.SELECT }); 

            res.render('content-backoffice/user/edit', {respon, kec, user: req.session.user}); 
        })
        .catch(err=>{
            res.json(err)
        })
          
       }

       static async edit_password(req, res){
        const{id}=req.params
        usersModel.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(async (respon)=>{

            res.render('content-backoffice/user/edit_password', {respon, user: req.session.user}); 
        })
        .catch(err=>{
            res.json(err)
        })
          
       }

    static register(req, res){
        const {username,password,nama,role}= req.body
        let encryptedPassword = bcrypt.hashPassword(password)
        usersModel.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"Username Sudah Terdaftar"})
            }
            else{
                
                usersModel.create({username:username, password:encryptedPassword, nama : nama, role:role}, {returning: true}).then(respon =>{
                res.json(respon)
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }


      static submit_insert(req, res){
        const {username,password,nama,role, kecamatan, kelurahan}= req.body
        let encryptedPassword = bcrypt.hashPassword(password)
        usersModel.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"Username Sudah Terdaftar"})
            }
            else{
                
                usersModel.create({username:username, password:encryptedPassword, nama : nama, role:role}, {returning: true}).then(respon =>{
                    res.redirect('/user/list')
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }
      static submit_edit(req,res){
       
        // const {username,nama,role, kecamatan, kelurahan}= req.body
        
        usersModel.update(req.body,{
            where :{
                id:req.body.id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            // res.json(respon)
            res.redirect('/user/list')
        })
        .catch(err=>{
            res.json(err)
        })

    }


    static submit_edit_password(req,res){
       
        const {password}= req.body
        let encryptedPassword = bcrypt.hashPassword(password)
        usersModel.update({
            password: encryptedPassword
        },{
            where :{
                id:req.body.id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            // res.json(respon)
            res.redirect('/user/list')
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static login(req,res){
        const{username,password}= req.body
        console.log(req.body)
        usersModel.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            console.log(data)
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
        data[0].dataValues.accesstoken = jwt.generateToken(data[0].dataValues);
                if(data[0].dataValues.role=="Admin" && hasil){
                  
                    req.session.user= data[0].dataValues;
                   
                    req.session.save()
                    console.log(decodeURIComponent(req.body.tujuan))
                    req.body.tujuan? res.redirect(decodeURIComponent(req.body.tujuan)) :res.redirect('/backoffice')
                }
                else if((data[0].dataValues.role=="Surveyor" || data[0].dataValues.role=="Dewan") && hasil){
                  
                    res.json(data)
                    // res.json({message : "Sementara dikunci"})
                  }
                else{
                    res.json({message : "password salah"})
                }
            }
            else{res.json({message :"username tidak terdaftar"})}
        })
        .catch(err=>{
            res.json({message : err})
        })
    }

    static loginAdmin(req,res){
        const{username,password}= req.body
        console.log(req.body)
        usersModel.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            console.log(data)
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
        data[0].dataValues.accesstoken = jwt.generateToken(data[0].dataValues);
                if(data[0].dataValues.role=="Admin" && hasil){
                  
                    req.session.user= data[0].dataValues;
                   
                    req.session.save()
                    console.log(decodeURIComponent(req.body.tujuan))
                    if(decodeURIComponent(req.body.tujuan)=='/user/loginadmin'){
                        res.redirect('/backoffice')
                    }else{
                        req.body.tujuan? res.redirect(decodeURIComponent(req.body.tujuan)) :res.redirect('/backoffice')
                    }
                }else if(data[0].dataValues.role=="Surveyor" && hasil){
                    req.session.user= data[0].dataValues;
                   
                    req.session.save()
                    console.log(decodeURIComponent(req.body.tujuan))
                    if(decodeURIComponent(req.body.tujuan)=='/user/loginadmin'){
                        res.redirect('/backoffice')
                    }else{
                        req.body.tujuan? res.redirect(decodeURIComponent(req.body.tujuan)) :res.redirect('/backoffice')
                    }
                    // res.render('login', {message: "Sementara Dikunci!", tujuan: encodeURIComponent(req.originalUrl)})
                 
                 
                }
    
                else{
                    res.render('login', {message: "password salah!", tujuan: encodeURIComponent(req.originalUrl)})
                  
                }
            }
            else{
                res.render('login', {message: "username tidak terdaftar!", tujuan: encodeURIComponent(req.originalUrl)})
            
        }
        })
        .catch(err=>{
            res.json({message : err})
        })
    }
    static logout(req,res){
        req.session.user= '';
                   
        req.session.save()
        res.render('login', {message: "", tujuan: encodeURIComponent('/backoffice')})
    }
    static list(req,res){
        const{id}=req.params
        usersModel.findAll({
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
    
    static update(req,res){
        const {id}=req.params
        const {username,password,nama,role}= req.body
        
        usersModel.update({
            username:username,
            password:password,
            nama:nama,
            role:role
        },{
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
        usersModel.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            // res.json(`berhasil delete id : ${id}`)
            res.redirect('/user/list')
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller


