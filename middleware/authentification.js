const {verifyToken} = require('../helper/jwt')
const User = require('../model/usersModel')

function authentificationAdmin(req,res,next){
  
    if(!req.session.user){
        res.render('login', {message: "", tujuan: encodeURIComponent(req.originalUrl)})
    }else{
        const decode = verifyToken(req.session.user.accesstoken)
    
        User.findAll({
             where:{
                 password:decode.password
             }
         })
         .then(data=>{
            // console.log(data[0].dataValues.role, 'hasil decode')
             if(data[0].dataValues.role=="Admin"){ 
                 
                 next()
             }
             else{
                 // res.json({status : 400,message :"bukanAdmin" });
                 res.render('login', {message: "Bukan Admin!", tujuan: encodeURIComponent(req.originalUrl)})
             }
         })
         .catch(err=>{
             next(err)
             
         })
    }

}

function authentificationSurveyor(req,res,next){
    
    
    const decode = verifyToken(req.headers.accesstoken)
      User.findAll({
           where:{
               password:decode.password
           }
       })
       .then(data=>{
           if(data.role=="Surveyor"){ 
               next()
           }
           else{
               res.json({status : 400,message :"Bukan Surveyor" })
            
           }
       })
       .catch(err=>{
           next(err)
           
       })
   }

module.exports = {authentificationAdmin,authentificationSurveyor}
