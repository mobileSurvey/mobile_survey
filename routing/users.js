const router = require('express').Router()
const controller = require('../controller/userscontroller')


router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/list:id',controller.list)
router.post('/update',controller.update)
router.delete('/delete:id',controller.delete)

module.exports=router