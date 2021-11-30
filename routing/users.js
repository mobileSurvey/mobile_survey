const router = require('express').Router()
const controller = require('../controller/usersController')
const {authentificationAdmin, authentificationSurveyor} = require('../middleware/authentification');

router.get('/list', authentificationAdmin,controller.listAll)
router.get('/insert',authentificationAdmin,controller.insert)
router.get('/edit/:id',authentificationAdmin,controller.edit)
router.get('/edit_password/:id',authentificationAdmin,controller.edit_password)
router.post('/submit_insert', authentificationAdmin,controller.submit_insert)
router.post('/submit_edit',authentificationAdmin, controller.submit_edit)
router.post('/submit_edit_password',authentificationAdmin, controller.submit_edit_password)


router.get('/logout',controller.logout)
router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/loginadmin',controller.loginAdmin)
router.post('/list/:id',controller.list)
router.post('/update',controller.update)
router.get('/delete:id',controller.delete)

module.exports=router