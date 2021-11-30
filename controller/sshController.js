const ssh = require('../model/sshModel')

class Controller{

    static listAll(req, res){
        ssh.findAll()
        .then(respon=>{
            // console.log(respon)
            res.render('content-backoffice/masterSsh/list', {respon, user: req.session.user});    
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static insert(req, res){
        res.render('content-backoffice/masterSsh/insert',{ user: req.session.user});       
      }

    static edit(req, res){
      const{id}=req.params
        ssh.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.render('content-backoffice/masterSsh/edit', {respon, user: req.session.user});  
        })
        .catch(err=>{
            res.json(err)
        })    
    }


    static create(req, res){
      const post= req.body
      ssh.findAll({
          where:{
              ssh:post.ssh
          }
      }).then(data=>{
          if(data.length){
              res.json({message :"data sudah ada"})
          }
          else{
              ssh.create(post, {returning: true}).then(respon =>{
                  res.json(respon)
               })
               .catch(err=>{
                   res.json(err)
               })
          }
      })
 
    }

    static submit_insert(req, res){
      const post = req.body
      ssh.create(req.body).then(respon =>{
        res.redirect('/ssh/list')
     })
     .catch(err=>{
         res.json(err)
     })
    }

    static list(req,res){
      const{id}=req.params
      ssh.findAll({
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
      ssh.findAll()
      .then(respon=>{
          res.json({respon})
      })
      .catch(err=>{
          res.json(err)
      })
  }
  static update(req,res){
      const {id}=req.params
      const {ssh}= req.body
      
      ssh.update({
          ssh
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
      ssh.update(
        post
      ,{
          where :{
              id:req.body.id
          }
      })
      .then(respon=>{
          res.redirect('/ssh/list')
      })
      .catch(err=>{
          res.json(err)
      })

  }


  static delete(req,res){
      const{id}= req.params
      ssh.destroy({
          where : {
              id: id
          }
      }).then(respon=>{
          res.redirect('/ssh/list')
          
      })
      .catch(err=>{
          res.json(err)
      })
  }

}

module.exports=Controller