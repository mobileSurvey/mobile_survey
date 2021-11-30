const router = require('express').Router()
const controller = require('../controller/content')


router.get('/', controller.index)
router.get('/get_kel_bykec/:kec', controller.get_kel_bykec)
router.get('/get_kec_by_tahun/:tahun', controller.get_kec_by_tahun)
router.get('/get_keg_by_jenis/:tahun', controller.get_keg_by_jenis)
router.get('/kegiatan_by_kel/:kel', controller.kegiatan_by_kel)
router.get('/kegiatan_by_jenis/:jenis/:tahun', controller.kegiatan_by_jenis)
router.get('/kegiatan_by_kec/:kec/:tahun', controller.kegiatan_by_kec)
module.exports=router