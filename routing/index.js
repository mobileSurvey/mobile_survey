const router = require('express').Router()
const users = require('./users')
const jenis = require('./jenis')

router.use('/users',users)
router.use('/jenis',jenis)

module.exports=router
