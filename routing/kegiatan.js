const router = require('express').Router()
const controller = require('../controller/kegiatanController')

router.get('/list', controller.listView)
router.get('/insert',controller.insert)
router.get('/edit/:id',controller.edit)
router.get('/kec',controller.kec)
router.get('/kel/:kec',controller.kel)

router.post('/create', controller.create)
router.post('/list/:id',controller.list)
router.post('/listall',controller.listAll)
router.post('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)
router.post('/excel',controller.insertExcel)

module.exports=router