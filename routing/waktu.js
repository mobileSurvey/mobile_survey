const router = require('express').Router()
const controller = require('../controller/waktuController')
const {authentificationAdmin} = require('../middleware/authentification');

router.post('/updateWaktu',controller.updateWaktu)
router.get('/checkWaktuDewan',controller.checkWaktuDewan)
router.get('/checkWaktuSurveyor',controller.checkWaktuSurveyor)


module.exports=router