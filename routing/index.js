const router = require('express').Router()
const users = require('./users')
const jenis = require('./jenis')
const ssh = require('./ssh')
const kegiatan = require('./kegiatan')
const contoh = require('./contoh')
const importData = require('./importData')
const dashboard = require('../controller/dashboard')
const content = require('./content')
const dewan = require('./dewan')
const waktu = require('./waktu')

router.use('/',content)
router.use('/user',users)
router.use('/jenis',jenis)
router.use('/ssh',ssh)
router.use('/dewan',dewan)
router.use('/kegiatan',kegiatan)
router.use('/importData',importData)
router.use('/contoh',contoh)
router.use('/waktu',waktu)



const {authentificationAdmin} = require('../middleware/authentification');
router.get('/backoffice',authentificationAdmin, dashboard.dashboard);

module.exports=router
