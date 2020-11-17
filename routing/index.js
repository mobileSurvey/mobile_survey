const router = require('express').Router()
const users = require('./users')
const jenis = require('./jenis')
const kegiatan = require('./kegiatan')
const dashboard = require('../controller/dashboard')
const {authentificationAdmin} = require('../middleware/authentification');

router.use('/users',users)
router.use('/jenis',jenis)
router.use('/kegiatan',kegiatan)
router.get('/dashboard',authentificationAdmin, dashboard.dashboard);

module.exports=router
