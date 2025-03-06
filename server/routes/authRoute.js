const express = require('express');

const routes = express.Router();

const {registerUser, login ,adminAccess,managerAccess,userProfile} = require('../controllers/AuthController');

const { verifyToken, authorizeRole } = require('../middleware/AuthMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({});

const userImage = multer({ storage: storage }).single('userimage');

routes.post('/login',login)
routes.post('/register',userImage,registerUser)
routes.post('/userprofile',userImage,userProfile)















//example test rolebase authentication
routes.get('/admin-access',verifyToken,authorizeRole(['admin']),adminAccess)
routes.get('/manager-access',verifyToken,authorizeRole(['admin','manager']),managerAccess)
//example test rolebase authentication



module.exports = routes;