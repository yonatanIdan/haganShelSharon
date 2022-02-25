const { usersService } = require('../service/usersService');
const { kindergartensController } = require('./kindergartensController');

class UsersController {
    constructor() {}

    users(req, res) {
        usersService.users((err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.status(200).json(data)
        });
    }
    deleteUser(req, res) {
        usersService.deleteUser(req.body._id, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else {
                kindergartensController.deleteStaffKindergarten(req.body, res);
                res.status(200).json(data);
            }
        });
    }
    newUser(req, res) {
        console.log(req.body);
        usersService.newUser(req.body, (err, dataUser) => {
            if (err) res.status(400).json({ Error: 'Error in Data Base', reason: err })
            else {
                kindergartensController.updateStaffKindergarten(dataUser, res);
                res.status(200).json(dataUser);
            };
        });
    }
    updateUser(req, res) {
        usersService.updateUser(req.body, (err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }

}

module.exports = {
    usersController: new UsersController()
}