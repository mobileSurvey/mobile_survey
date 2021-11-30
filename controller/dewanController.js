const dewan = require('../model/dewanModel')

class Controller{

    static listAll(req, res){
        dewan.findAll()
        .then(respon=>{
            // console.log(respon)
            res.render('content-backoffice/masterDewan/list', {respon, user: req.session.user});    
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static insert(req, res){
        res.render('content-backoffice/masterDewan/insert',{ user: req.session.user});       
      }

    static edit(req, res){
      const{id}=req.params
      dewan.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.render('content-backoffice/masterDewan/edit', {respon, user: req.session.user});  
        })
        .catch(err=>{
            res.json(err)
        })    
    }


    static create(req, res){
      const post= req.body
      dewan.create(post, {returning: true}).then(respon =>{
        res.json(respon)
     })
     .catch(err=>{
         res.json(err)
     })
 
    }

    static submit_insert(req, res){
      const post = req.body
      dewan.create(req.body).then(respon =>{
        res.redirect('/dewan/list')
     })
     .catch(err=>{
         res.json(err)
     })
    }

    static list(req,res){
      const{id}=req.params
      dewan.findAll({
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
  
  static listForApp(req,res){
      const{id}=req.params
      dewan.findAll()
      .then(respon=>{
          res.json({respon})
      })
      .catch(err=>{
          res.json(err)
      })
  }
  static update(req,res){
      const {id}=req.params
      const {dewan}= req.body
      
      dewan.update({
        dewan
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

  static submit_edit(req,res){
    
      const post= req.body
      console.log(post)
      dewan.update(
        post
      ,{
          where :{
              id:req.body.id
          }
      })
      .then(respon=>{
          res.redirect('/dewan/list')
      })
      .catch(err=>{
          res.json(err)
      })

  }


  static delete(req,res){
      const{id}= req.params
      dewan.destroy({
          where : {
              id: id
          }
      }).then(respon=>{
          res.redirect('/dewan/list')
          
      })
      .catch(err=>{
          res.json(err)
      })
  }

}

module.exports=Controller