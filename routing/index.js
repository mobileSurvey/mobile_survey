const router = require('express').Router()
const users = require('./users')
const jenis = require('./jenis')
const kegiatan = require('./kegiatan')
const contoh = require('./contoh')
const importData = require('./importData')
const dashboard = require('../controller/dashboard')

router.use('/user',users)
router.use('/jenis',jenis)
router.use('/kegiatan',kegiatan)
router.use('/importData',importData)
router.use('/contoh',contoh)



const {authentificationAdmin} = require('../middleware/authentification');
router.get('/backoffice',authentificationAdmin, dashboard.dashboard);

module.exports=router
