const waktu = require('../model/waktuModel')
const moment = require('moment')

function createWaktu() {
    waktu.findOrCreate({
        where: {
            id: 1,
        },
        defaults: {},
    });
}
createWaktu();



class Controller {

    static edit(req, res) {
        waktu.findAll({
            where: {
                id: 1
            }
        })
            .then(hasil => {
                let hasil2={}
                hasil2.waktuAwalDewan=moment(hasil[0].dataValues.waktuAwalDewan).format('YYYY-MM-DD HH:mm:ss')
                hasil2.waktuAkhirDewan=moment(hasil[0].dataValues.waktuAkhirDewan).format('YYYY-MM-DD HH:mm:ss')
                hasil2.waktuAwalSurveyor=moment(hasil[0].dataValues.waktuAwalSurveyor).format('YYYY-MM-DD HH:mm:ss')
                hasil2.waktuAkhirSurveyor=moment(hasil[0].dataValues.waktuAkhirSurveyor).format('YYYY-MM-DD HH:mm:ss')
        res.render('content-backoffice/jadwalBukaTutup/edit', { user: req.session.user, hasil2 });
       
            })

    }

    static updateWaktu(req, res) {
        const { waktuAwalDewan, waktuAkhirDewan, waktuAwalSurveyor, waktuAkhirSurveyor } = req.body
        waktu.update({ waktuAwalDewan, waktuAkhirDewan, waktuAwalSurveyor, waktuAkhirSurveyor }, {
            where: {
                id: 1
            }
        })
            .then(hasil => {
                res.json("sukses")
            })
            .catch(err => {
                res.json(err)
            })
    }

    static checkWaktuDewan(req, res) {
        waktu.findAll({
            where: {
                id: 1
            }
        })
            .then(hasil => {
                if (hasil[0].waktuAwalDewan <= moment() && hasil[0].waktuAkhirDewan >= moment()) {
                    res.status(200).json({ status: 200, message: true })
                }
                else {
                    res.status(200).json({ status: 200, message: false })
                }

            })
            .catch(err => {
                res.json(err)
            })
    }

    static checkWaktuSurveyor(req, res) {
        waktu.findAll({
            where: {
                id: 1
            }
        })
            .then(hasil => {
                if (hasil[0].waktuAwalSurveyor <= moment() && hasil[0].waktuAkhirSurveyor >= moment()) {
                    res.status(200).json({ status: 200, message: true })
                }
                else {
                    res.status(200).json({ status: 200, message: false })
                }

            })
            .catch(err => {
                res.json(err)
            })
    }

    static checkWaktuDewanf() {
        waktu.findAll({
            where: {
                id: 1
            }
        })
            .then(hasil => {
                if (hasil[0].waktuAwalDewan <= moment() && hasil[0].waktuAkhirDewan >= moment()) {
                    return true;
                }
                else {
                    return false
                }

            })
            .catch(err => {
                return err
            })
    }

    static checkWaktuSurveyorf() {
        waktu.findAll({
            where: {
                id: 1
            }
        })
            .then(hasil => {
                if (hasil[0].waktuAwalSurveyor <= moment() && hasil[0].waktuAkhirSurveyor >= moment()) {
                    return true
                }
                else {
                    return false
                }

            })
            .catch(err => {
                return err
            })
    }
}

module.exports = Controller