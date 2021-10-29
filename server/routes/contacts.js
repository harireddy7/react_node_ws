const express = require('express');
const { getContactsDev } = require('../controllers/contacts');

const router = express.Router();

router.get('/', getContactsDev);

module.exports = router;