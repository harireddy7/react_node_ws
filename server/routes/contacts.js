const express = require('express');
const { getContactsDev, getRandomContacts } = require('../controllers/contacts');

const router = express.Router();

router.get('/:id', getContactsDev);

module.exports = router;