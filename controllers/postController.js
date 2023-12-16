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

// update post
postController.put('/:postId', async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        const postId = req.params.postId;

        // Check if the post exists
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if at least one field is provided for update
        if (!title && !description && !userId) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        // Update only the provided fields
        if (title) existingPost.title = title;
        if (description) existingPost.description = description;

        // Save the updated post
        await existingPost.save();

        return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = postController