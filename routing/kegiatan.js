const router = require('express').Router()
const controller = require('../controller/kegiatanController')

router.get('/list', controller.listAll)
router.get('/insert',controller.insert)
router.get('/edit/:id',controller.edit)

router.post('/create', controller.create)
router.post('/list:id',controller.list)
router.post('/update',controller.update)
router.delete('/delete/:id',controller.delete)
router.post('/excel',controller.insertExcel)

module.exports=router