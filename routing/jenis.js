const router = require('express').Router()
const controller = require('../controller/jenisController')

router.get('/list', controller.listAll)
router.get('/insert',controller.insert)
router.get('/edit/:id',controller.edit)

router.get('/listforapp', controller.listForApp)
router.post('/create', controller.create)
router.post('/list:id',controller.list)
router.post('/update',controller.update)
router.delete('/delete/:id',controller.delete)

module.exports=router