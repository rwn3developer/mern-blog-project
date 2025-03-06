const User = require('../models/UserModel');
const changePassword = async (req, res) => {
    try {
        const { email, oldpassword, newpassword } = req.body

        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'User not found'
            })
        }
        if (user.password != oldpassword) {
            return res.status(401).send({
                success: false,
                message: 'Old password is not match'
            })
        }
        await User.findOneAndUpdate({ email: email }, {
            password: newpassword
        })
        return res.status(200).send({
            success: true,
            message: 'password successfully changed'
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    changePassword
}