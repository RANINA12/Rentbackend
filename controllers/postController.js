const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Create a new blog post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error('Title and content are required.');
    }

    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a featured image.');
    }

    const post = new Post({
        title,
        content,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        author: req.user._id,
        featuredImage: {
            public_id: req.file.filename,
            url: req.file.path,
        },
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
});

// @desc    Fetch all blog posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})
        .populate('author', 'name')
        .sort({ createdAt: -1 });
    res.json(posts);
});

// @desc    Fetch a single blog post by its slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug })
        .populate('author', 'name avatar bio');

    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

const deletePostAdmin = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Optional: Agar aap image Cloudinary ya kisi storage me save kar rahe hain,
        // toh usko delete karne ka code yahan aayega.
        await post.deleteOne();
        res.json({ message: 'Post removed successfully' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});


module.exports = {
    createPost,
    getAllPosts,
    getPostBySlug,
     deletePostAdmin,
};