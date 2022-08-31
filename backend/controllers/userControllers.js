const express = require('express')
const user = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//METHOD POST
//ROUTE  /api/users

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please enter registeration details')
    }

    // checking email exists or not

    const checkUser = await user.findOne({ email })
    if (checkUser) {
        res.status(400)
        throw new Error('user already exists');
    }

    //hashing password

    const hashedPassword = await bcrypt.hash(password, 10)

    //creating  new user

    const newUser = await user.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            email: newUser.email,
            token: generateToken(newUser.id)
        })
    } else {
        res.status(400)
        throw new Error('oops........');
    }

    res.json({ message: "hi from registerUser" })
})


//METHOD POST
//ROUTE /api/users/login

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const fetchUser = await user.findOne({ email })


    if (fetchUser && (await bcrypt.compare(password, fetchUser.password))) {
        res.json({
            _id: fetchUser.id,
            email: fetchUser.email,
            name: fetchUser.name,
            token: generateToken(fetchUser.id)


        })
    } else {
        res.status(400)
        throw new Error('oops.. cant find You')
    }
})

//METHOD GET
//ROUTE /api/users/user

const getUser = asyncHandler(async (req, res) => {


    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      })
})



//FUNC. creating JWT 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECERT, {
        expiresIn: '1d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getUser
}