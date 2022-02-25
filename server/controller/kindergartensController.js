const { kindergartensService } = require('../service/kindergartensService');
class KindergartensController {
    constructor() {}

    kindergartens(req, res) {
        kindergartensService.kindergartens((err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }
    deleteKindergarten(req, res) {
        kindergartensService.deleteKindergarten(req.body.phone, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data);
        });
    }
    newKindergarten(req, res) {
        console.log(req.body);
        kindergartensService.newKindergarten(req.body, (err, data) => {
            if (err) res.status(400).json({ Error: 'Error in Data Base', reason: err })
            else res.json(data);
        });
    }
    updateKindergarten(req, res) {
        kindergartensService.updateKindergarten(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }
    updateStaffKindergarten(req, res) {
        console.log('updateStaff', req);
        kindergartensService.updateStaffKindergarten(req, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
        });
    }
    deleteStaffKindergarten(req, res) {
        console.log('deleteStaff', req);
        kindergartensService.deleteStaffKindergarten(req, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
        });
    }

}

module.exports = {
    kindergartensController: new KindergartensController()
}