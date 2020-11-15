const router = require('express').Router()
const controller = require('../controller/jenisController')


router.post('/create', controller.create)
router.post('/update',controller.update)
router.delete('/delete/:id',controller.delete)

module.exports=router