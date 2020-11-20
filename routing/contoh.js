const router = require('express').Router()
const controller = require('../controller/contoh')


router.get('/list', controller.listAll)
router.get('/insert',controller.insert)
router.get('/edit/:id',controller.edit)


module.exports=router