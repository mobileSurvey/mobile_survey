const {verifyToken} = require('../helper/jwt')
const User = require('../model/usermodel')

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
            res.json({status : 400,message :"bukanAdmin" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

function authentificationMasyarakat(req,res,next){
    
    
    const decode = verifyToken(req.headers.accesstoken)
      User.findAll({
           where:{
               password:decode.password
           }
       })
       .then(data=>{
           if(data.role=="Masyarakat"){ 
               next()
           }
           else{
               res.json({status : 400,message :"Bukan Masyarakat" })
           }
       })
       .catch(err=>{
           next(err)
           
       })
   }

module.exports = {authentificationAdmin,authentificationMasyarakat}
