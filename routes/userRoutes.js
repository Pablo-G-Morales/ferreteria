const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/usuarios', userController.getUsers);

module.exports = router;
