const jenis = require('../model/jenisModel')



class Controller{
    static listAll(req, res){
        jenis.findAll()
        .then(respon=>{
            console.log(respon)
            res.render('content-backoffice/masterJenis/list', {respon, user: req.session.user});    
        })
        .catch(err=>{
            res.json(err)
        })
      
    }

    static insert(req, res){
        
      res.render('content-backoffice/masterJenis/insert',{user: req.session.user});       
    }

    static edit(req, res){
        const{id}=req.params
        jenis.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.render('content-backoffice/masterJenis/edit', {respon, user: req.session.user});  
        })
        .catch(err=>{
            res.json(err)
        })
       
    }
    
    static create(req, res){
        const post= req.body
        jenis.findAll({
            where:{
                jenis:post.jenis
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                jenis.create({jenis:post.jenis}, {returning: true}).then(respon =>{
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
        jenis.findAll({
            where:{
                jenis:post.jenis
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                jenis.create({jenis:post.jenis}, {returning: true}).then(respon =>{
                    res.redirect('/jenis/list')
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
   
      }

      static list(req,res){
        const{id}=req.params
        jenis.findAll({
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
        jenis.findAll()
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static update(req,res){
        const {id}=req.params
        const {jenis}= req.body
        
        jenis.update({
            jenis:jenis
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
        
        jenis.update({
            jenis:post.jenis
        },{
            where :{
                id:req.body.id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.redirect('/jenis/list')
        })
        .catch(err=>{
            res.json(err)
        })

    }


    static delete(req,res){
        const{id}= req.params
        jenis.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.redirect('/jenis/list')
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller