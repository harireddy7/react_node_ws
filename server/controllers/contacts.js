const fs = require('fs');
const path = require('path');

const CONTACTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/users.json'), 'utf-8'))

const getContactsDev = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: CONTACTS,
    })
}

module.exports = {
    getContactsDev
}