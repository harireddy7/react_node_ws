const fs = require('fs');
const path = require('path');
const axios = require('axios');

const CONTACTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/users.json'), 'utf-8'))

const getContactsDev = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: CONTACTS,
    })
}

const getRandomContacts = (req, res) => {
    axios.get('https://randomuser.me/api/?results=10&inc=name,cell,picture,login&nat=us').then(response => {
        // console.log(response.data);
        let contacts = [];
        if (response.data) {
            contacts = response.data.results.map(user => {
                const { name, login, picture, cell } = user;
                return {
                    id: login.uuid,
                    name: `${name.first} ${name.last}`,
                    mobile: cell.replace(/[-() ]/, ''),
                    image: picture.large
                }
            })
        }
        return res.status(200).json({
            status: 'success',
            data: contacts
        })
    }).catch(err => {
        // console.log(err)
        return res.status(500).json({
            status: 'failure',
            data: null
        })
    });
}

module.exports = {
    getContactsDev,
    getRandomContacts
}