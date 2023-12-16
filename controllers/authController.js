const authController = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


// register
authController.post('/register', async(req,res) => {
    try{
        const {username, email, password} = req.body;

        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Already such an account with this email. Try with new one")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({message: "User regisyered successfully"})

    } catch(error){
        return res.status(500).json(error.message)
    }
})

// login
authController.post('/login', async(req,res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({email: email})
        if(!user){
            throw new Error("User credentials are wrong")
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            throw new Error("User credentials are wrong")
        }

        const { password, ...others} = user._doc

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '5h'}
        )

        return res.status(201).json({others, token})

    } catch(error) {
        return res.status(500).json(error.message)
    }
})


module.exports = authController