// const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError }= require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('Received Auth Header', authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    console.log('Extracted Token', token)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Decoded Payload:', payload); // 檢查 Token 是否有效
        // req.user = User.findById(payload.id).select('-password')
        req.user = { userId:payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth