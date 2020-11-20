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
        const {tipe}= req.body
        jenis.findAll({
            where:{
                tipe:tipe
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                jenis.create({tipe:tipe}, {returning: true}).then(respon =>{
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
    
    
    static update(req,res){
        const {id}=req.params
        const {tipe}= req.body
        
        jenis.update({
            tipe:tipe
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