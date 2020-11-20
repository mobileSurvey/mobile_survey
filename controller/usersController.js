const usersModel = require('../model/usersModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')



class Controller{


    static listAll(req, res){
        res.render('dashboard');    
       }

    static insert(req, res){
       res.render('dashboard');    
      }

      static edit(req, res){
        res.render('dashboard');    
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

    static login(req,res){
        const{username,password}= req.body

        usersModel.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            console.log(data[0].dataValues)
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(data[0].dataValues.role=="Admin" && hasil){
                  
                    req.session.user= data[0].dataValues;
                    req.session.save()
                    res.json("sukses")
                }
                else if(data[0].dataValues.role=="Masyarakat" && hasil){
                    res.json({accesstoken : jwt.generateToken(data[0].dataValues)})
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

        usersModel.findAll({
            where:{
                username:username
            },attributes: ['password']
        })
        .then(data=>{
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
        if(hasil){
            if(data[0].role=="Admin"){
                req.session= data;
                req.session.save()
                res.redirect('/dashboard');
            }else{
                res.render('login', {message: "Role Bukan Admin"})
            }
        } else{
            res.render('login', {message: "password salah"});
                }
            }
            else{
                res.render('login', {message: "username tidak terdaftar"});
            }
        })
        .catch(err=>{
            res.json({message : err})
        })
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
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller


