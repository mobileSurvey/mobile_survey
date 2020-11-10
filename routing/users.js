const router = require('express').Router()
const controller = require('../controller/userscontroller')


router.post('/register', controller.register)

module.exports=router