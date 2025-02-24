const User = require('../models/user');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require("../errors");
// const bcrypt = require('bcryptjs') // 移動到models/Users.js裡面

const register = async (req, res) => {
    // const { name, email, password } = req.body;
    //
    // const salt = await bcrypt.genSalt(10);  // random bytes
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const tempUser = { name, email, password: hashedPassword };
    //
    // const user = await User.create({...tempUser});
    // 使用 Mongoose 在 MongoDB 中創建新用戶 (User.create)。
    // const user = await User.create({...req.body});
    // 來自 http-status-codes 模組，等同於 201 (表示資源已成功創建)。
    // .json({ user })：將剛剛創建的用戶物件 user 轉成 JSON 格式並發送回客戶端。
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({user: {name: user.name}, token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide a valid email and password')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register,
    login,
}