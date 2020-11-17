const {verifyToken} = require('../helper/jwt')
const User = require('../model/usersModel')

function authentificationAdmin(req,res,next){
    
 const decode = verifyToken(req.session.accesstoken)

   User.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{
        if(data.role=="Admin"){ 
            
            next()
        }
        else{
            // res.json({status : 400,message :"bukanAdmin" });
            res.render('dashboard', {message: "Bukan Surveyor"})
        }
    })
    .catch(err=>{
        next(err)
        
    })
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
