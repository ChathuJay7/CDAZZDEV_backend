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


// get post by id
postController.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({post});
    } catch (error) {
        console.error('Error getting post by ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


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

        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!title && !description && !userId) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        if (title) existingPost.title = title;
        if (description) existingPost.description = description;

        await existingPost.save();

        return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = postController