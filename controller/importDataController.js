
class Controller{

    static listAll(req, res){
        res.render('content-backoffice/importData/list');    
       }

    static insert(req, res){
        res.render('content-backoffice/importData/insert');       
      }

      static edit(req, res){
        res.render('content-backoffice/importData/edit');    
       }

}

module.exports=Controller