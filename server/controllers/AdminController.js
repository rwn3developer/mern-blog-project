const User = require('../models/UserModel');

let clouldinary = require('cloudinary').v2;

const allUserShow = async(req,res) => {
    try{
        let users = await User.find({});
        return res.status(200).send({
            success : true,
            message : 'users fetch successfully',
            users
        })
    }catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
const singelUser = async(req,res) => {
    try{
        let userid = req.query?.userid;
        let user = await User.findById(userid);
        return res.status(200).send({
            success : true,
            message : 'user fetch successfully',
            user
        })
    }catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
const deleteUser = async(req,res) => {
    try{
        let userid = req.query?.userid;
        let oldimage = await User.findById(userid)
        //image remove from cloudinary
        await clouldinary.uploader.destroy(oldimage?.public_id);
        let user = await User.findByIdAndDelete(userid);
        return res.status(200).send({
            success : true,
            message : 'user deleted successfully',
            user
        });
    }catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
//user change role by admin side
const changeRole = async(req,res) => {
    try{
        let userid = req.query?.userid;
        let role = req.body.role;
        let user = await User.findByIdAndUpdate(userid,{
            role : role
        });
        return res.status(200).send({
            success : true,
            message : 'user role changed successfully',
            user
        })
        
    }
    catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
const chageStatus = async(req,res) => {
    try{
        let userid = req.query?.userid;
        let status = req.body.status;
        let user = await User.findByIdAndUpdate(userid,{
            status : status
        });
        return res.status(200).send({
            success : true,
            message : 'user status changed successfully',
            user
        })
    }
    catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
const updateUser = async(req,res) => {
    try{
        const {userid,name,email,password,gender,city,contact,status,role} = req.body;
        if(req.file){
            //old image remove in clouldinari
            let oldimage = await User.findById(userid);
            await clouldinary.uploader.destroy(oldimage?.public_id);
            //new image upload in clouldinary
            let imageUrl = await clouldinary.uploader.upload(req.file.path)
            let user = await User.findByIdAndUpdate(userid,{
                name : name,
                email : email,
                password:password,
                gender : gender,
                city : city,
                contact : contact,
                image : imageUrl?.secure_url,
                public_id:imageUrl?.public_id,
                status : status,
                role : role,
            })
            return res.status(200).send({
                success : true,
                message : 'user updated successfully',
                user
            })
        }else{
            let oldimage = await User.findById(userid);
            let user = await User.findByIdAndUpdate(userid,{
                name : name,
                email : email,
                password:password,
                gender : gender,
                city : city,
                contact : contact,
                image : oldimage?.image,
                public_id:oldimage?.public_id,
                status : status,
                role : role,
            })
            return res.status(200).send({
                success : true,
                message : 'user updated successfully',
                user
            })
        }  
        
        
    }
    catch(err){
        return res.status(501).send({
            success : false,
            error : err
        })
    }
}
module.exports = {
    allUserShow,singelUser,deleteUser,changeRole,chageStatus,updateUser
}