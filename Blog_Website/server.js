const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });
const Post = mongoose.model('Post', { title: String, content: String });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: 'desc' });
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a post
app.post('/posts', async (req, res) => {
    try {
        const post = new Post({ title: req.body.title, content: req.body.content });
        await post.save();
        res.status(201).send(post);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).send('Post not found');
        }
        res.send(post);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
