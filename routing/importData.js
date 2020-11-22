const router = require('express').Router()
const controller = require('../controller/importDataController')
const {authentificationAdmin} = require('../middleware/authentification');

router.get('/list',authentificationAdmin, controller.listAll)
router.get('/insert',authentificationAdmin,controller.insert)
router.get('/edit/:id',authentificationAdmin,controller.edit)


module.exports=router