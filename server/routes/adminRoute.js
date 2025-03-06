const express = require('express');

const routes = express.Router();

const { allUserShow,singelUser,deleteUser,changeRole,chageStatus,updateUser } = require('../controllers/AdminController');

const multer = require('multer');

const storage = multer.diskStorage({});

const userImage = multer({ storage: storage }).single('userimage');

routes.get('/allusershow',allUserShow) 
routes.get('/singeluser',singelUser);
routes.delete('/deleteuser',deleteUser)
routes.put('/chagerole',changeRole)
routes.put('/chagestatus',chageStatus)
routes.put('/updateuser',userImage,updateUser)

module.exports = routes;