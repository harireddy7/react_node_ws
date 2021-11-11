const express = require('express');
const { getContactsDev, getRandomContacts, addNewContact } = require('../controllers/contacts');

const router = express.Router();

router.route('/').post(addNewContact)

router.get('/:id', getContactsDev);

module.exports = router;