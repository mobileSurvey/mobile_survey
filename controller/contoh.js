
class Controller{

    static listAll(req, res){
        res.render('content-backoffice/contoh/list');    
       }

    static insert(req, res){
        res.render('content-backoffice/contoh/insert');       
      }

      static edit(req, res){
        res.render('content-backoffice/contoh/edit');    
       }

}

module.exports=Controller