const jenis = require('../model/jenisModel')



class Controller{
    static listAll(req, res){
      res.render('content-backoffice/masterJenis/list');    
    }

    static insert(req, res){
      res.render('content-backoffice/masterJenis/insert');       
    }

    static edit(req, res){
      res.render('content-backoffice/masterJenis/edit');    
    }
    
    static create(req, res){
        const {jenis}= req.body
        jenis.findAll({
            where:{
                jenis:jenis
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                jenis.create({jenis:jenis}, {returning: true}).then(respon =>{
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


    static delete(req,res){
        const{id}= req.params
        jenis.destroy({
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