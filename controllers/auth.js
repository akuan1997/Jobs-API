const User = require('../models/user');
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

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
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login,
}