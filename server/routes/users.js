const express = require('express');
const { getUserInfo, addNewUser } = require('../controllers/user');

const router = express.Router();

router.route('/').post(addNewUser);

router.route('/:id').get(getUserInfo);

module.exports = router;