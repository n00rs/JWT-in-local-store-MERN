const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler (async (req, res, next)=>{
console.log(req.headers.authorization,'auth logging');
    let token

//checking token in header

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try {
    
token = req.headers.authorization.split(' ')[1]

//verifying tokens

const decode = jwt.verify(token, process.env.JWT_SECERT)

// 
req.user = await user.findById(decode.id).select('-password')

next()
} catch (error) {
    console.log(error,);
    res.status(401)
    throw new Error ('not authorized')
}
}
if (!token) {
    res.status(401)
    throw new Error ('No Token No Authorization ')
}
})


module.exports = {protect}