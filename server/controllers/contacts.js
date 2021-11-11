const fs = require('fs');
const path = require('path');
const axios = require('axios');
const User = require('../models/user');

const CONTACTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../dev-data/random-users.json'), 'utf-8'))

const getContactsDev = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (user) {
            const contactPromises = user.contacts.map(async contact => {
                return {
                    ...contact._doc,
                    image: await User.find({ mobile: contact.mobile }).then(users => users[0]?.image || '')
                }
            });
            const contacts = await Promise.all(contactPromises);

            return res.status(200).json({
                status: 'success',
                data: contacts,
            })
        } 
        return res.status(200).json({
            status: 'success',
            data: CONTACTS.filter(contact => contact.id !== userId),
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failure',
            message: err,
        })
    }
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

const addNewContact = async (req, res) => {
    // const id = req.params.id;
    const { id, name, mobile } = req.body;

    if (!id || !name || !mobile) {
        return res.status(400).json({
            status: 'failure',
            message: 'Name & mobile are required!'
        })
    }

    try {
        const user = await User.findById(id);

        // TODO: check if user is logged & editing his own contacts
    
        if (user) {
            const existingContact = user.contacts.find(c => c.mobile === mobile);
            const existingContactName = user.contacts.find(c => c.name === name);

            if (existingContact || existingContactName) {
                let errMessage = 'Contact already exists!';
                if (existingContact) {
                    errMessage = `Contact already added as "${existingContact.name}"`
                } else if (existingContactName) {
                    errMessage = `Contact name "${existingContactName}" already exists with different number!`
                }

                return res.status(400).json({
                    status: 'failure',
                    message: errMessage,
                })
            } else {
                // else add & return all contacts
                await User.updateOne({ _id: id }, { $push: { contacts: { name, mobile } } });
                const updatedContacts = (await User.findById(id)).contacts;
                // console.log(updatedContacts);

                return res.status(201).json({
                    status: 'success',
                    data: updatedContacts,
                })
            }
        }

        throw new Error('User must be logged in to add a contact');
    } catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err,
        })
    }

    res.status(201).json({
        status: 'success',
        data: {}
    })
}

module.exports = {
    getContactsDev,
    getRandomContacts,
    addNewContact,
}