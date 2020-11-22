const router = require('express').Router()
const controller = require('../controller/kegiatanController')
const {authentificationAdmin} = require('../middleware/authentification');

router.get('/list',authentificationAdmin, controller.listView)
router.get('/insert',authentificationAdmin,controller.insert)
router.get('/edit/:id',authentificationAdmin,controller.edit)
router.get('/kec',controller.kec)
router.get('/kel/:kec',controller.kel)
router.get('/delete/:id',controller.delete)

router.post('/create', controller.create)
router.post('/list/:id',controller.list)
router.post('/listall',controller.listAll)
router.post('/listforapp/:tahun/:kel',controller.listForApp)
router.post('/update/:id',controller.update)

router.post('/excel',controller.insertExcel)

module.exports=router