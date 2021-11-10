const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const CONTACTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/random-users.json'), 'utf-8'))

const getUserInfo = (req, res) => {
    const id = req.params.id;
    const userObj = CONTACTS.filter(contact => contact.mobile === id)[0] || null;

    res.status(200).json({
        status: 'success',
        data: userObj
    })
}

// CREATE NEW USER
const addNewUser = async (req, res) => {
    try {
        const users = await User.find({ mobile: req.body.mobile });

        let user = users[0];
        if (!user) {
            user = await User.create(req.body);
        }
        res.status(201).json({
            status: 'success',
            data: user,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'failure',
            message: err,
        })
    }

}

module.exports = {
    getUserInfo,
    addNewUser,
}