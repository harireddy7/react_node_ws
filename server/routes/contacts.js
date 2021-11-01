const express = require('express');
const { getContactsDev, getRandomContacts } = require('../controllers/contacts');

const router = express.Router();

router.get('/', getRandomContacts);

module.exports = router;