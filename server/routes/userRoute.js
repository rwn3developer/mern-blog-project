const express = require('express');

const routes = express.Router();

const { changePassword } = require('../controllers/UserController');

const { verifyToken } = require('../middleware/AuthMiddleware');

routes.post('/changepassword', verifyToken, changePassword)

module.exports = routes;