const router = require('express').Router()
const controller = require('../controller/kegiatanController')
const { authentificationAdmin, authentificationSurveyor } = require('../middleware/authentification');

router.get('/list', authentificationAdmin, controller.listView)
router.get('/list_json/:tahun', authentificationAdmin, controller.listJson)
router.get('/insert', authentificationAdmin, controller.insert)
router.get('/edit/:id', authentificationAdmin, controller.edit)
router.get('/kec', controller.kec)
router.get('/kel/:kec', controller.kel)
router.get('/update_status/:idkeg/:approval', controller.update_status)
router.get('/kel_resume/:kec/:tahun', controller.kel_resume)
router.get('/kel_resume_setuju/:kec/:tahun', controller.kel_resume_setuju)
router.get('/delete/:id', controller.delete)
router.get('/export_excel', controller.exportExcel)
router.post('/submit_insert', controller.submit_insert)
router.post('/submit_edit', controller.submit_edit)
router.get('/cetak/:id', controller.cetak)
router.get('/peta/:tahun', controller.peta)
router.get('/jalan', controller.jalan)
router.get('/list_dprd/:id/:tahun', authentificationAdmin, controller.dprd)
router.get('/cetak_laporan', controller.cetak_laporan)


router.post('/create', controller.create)
router.post('/list/:id', controller.list)
router.post('/listall', controller.listAll)
router.get('/listforapp/:tahun/:kel', controller.listForApp)
router.get('/jumlahanggaran/:tahun/:kel', controller.jumlahAnggaran)
router.get('/totalapproval/:tahun/:kel', controller.totalApproval)
router.get('/totaltersurvey/:tahun/:kel', controller.totalTersurvey)
router.get('/totalkegiatan/:tahun/:kel', controller.totalKegiatan)


router.get('/listforappdewan/:tahun/:dewanId', controller.listForAppDewan)
router.get('/jumlahanggarandewan/:tahun/:dewanId', controller.jumlahAnggaranDewan)
router.get('/totalapprovaldewan/:tahun/:dewanId', controller.totalApprovalDewan)
router.get('/totaltersurveydewan/:tahun/:dewanId', controller.totalTersurveyDewan)
router.get('/totalkegiatandewan/:tahun/:dewanId', controller.totalKegiatanDewan)
router.post('/update/:id', controller.update)
router.post('/insert', controller.insertApp)

router.get('/listditolak', controller.listDitolak)


router.post('/excel', controller.insertExcel)
router.post('/exceldewan', controller.insertExcelDewan)

module.exports = router