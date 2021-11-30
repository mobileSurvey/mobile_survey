const router = require('express').Router()
const controller = require('../controller/dewanController')
const {authentificationAdmin, authentificationSurveyor} = require('../middleware/authentification');

router.get('/list',authentificationAdmin, controller.listAll)
router.get('/insert',authentificationAdmin,controller.insert)
router.get('/edit/:id',authentificationAdmin,controller.edit)
router.post('/submit_insert',authentificationAdmin, controller.submit_insert)
router.post('/submit_edit',authentificationAdmin, controller.submit_edit)

router.get('/listforapp', controller.listForApp)
router.post('/create', controller.create)
router.post('/list:id',controller.list)
router.post('/update',controller.update)
router.get('/delete/:id',controller.delete)


module.exports=router