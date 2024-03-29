const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema);
// this const is basically Capital by practice

module.exports = Blog;