const express = require('express');
const { getChatsById } = require('../controllers/chats');

const router = express.Router();

router.get('/:id', getChatsById);

module.exports = router;