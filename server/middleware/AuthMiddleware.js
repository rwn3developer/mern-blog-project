const UserModel = require('../models/UserModel');
const  JWT = require('jsonwebtoken');
const verifyToken = (req,res,next) => {
    const token = req.headers.authorization;

    //check token
    if(!token){
        return res.status(401).send({
            success : false,
            message : 'Token not found'
        })
    }
    let newToken = token.slice(7);

    //token decode
    JWT.verify(newToken,"mahadev",(err,decode)=>{
        if(err){
            return res.status(401).send({
                success : false,
                message : 'Token is not valid'
            })
        }
        req.user = decode.payload
        return next();
    })
    
}
//rolebase authentication
const authorizeRole = (roles) =>{
    return (req,res,next) => {
        const role = req.user?.role;
        if(!roles.includes(role)){
            return res.status(403).send({
                success : false,
                message : 'Unauthorized Access'
            })
        }
        return next();
    }
}
module.exports = {
    verifyToken,authorizeRole
}