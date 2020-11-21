const router = require('express').Router()
const users = require('./users')
const jenis = require('./jenis')
const kegiatan = require('./kegiatan')
const contoh = require('./contoh')
const dashboard = require('../controller/dashboard')

router.use('/users',users)
router.use('/jenis',jenis)
router.use('/kegiatan',kegiatan)
router.use('/contoh',contoh)



const {authentificationAdmin} = require('../middleware/authentification');
router.get('/dashboard', dashboard.dashboard);

module.exports=router
