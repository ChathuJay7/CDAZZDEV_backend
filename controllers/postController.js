const postController = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')


// get all
postController.get('/', async(req, res) => {
    try {
        const posts = await Post.find()
        return res.status(200).json({posts})
    } catch(error) {
        console.log(error)
    }
})


// create post
postController.post('/', async(req,res) => {
    try{
        const {title, description, userId} = req.body;

        const newUser = await Post.create({
            title,
            description,
            userId
        })

        return res.status(201).json({message: "Post created successfully"})

    } catch(error){
        return res.status(500).json(error.message)
    }
})

module.exports = postController