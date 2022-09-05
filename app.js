// Requiring Express
const express = require('express');
// Requiring Middleware Morgan
const morgan = require('morgan');

// Including mongoose
const mongoose = require('mongoose');

// Including mongoose schema
const Blog = require('./models/blog');
const { render } = require('ejs');

// express app
const app = express();

// Database connection
const dbURI = 'mongodb+srv://ankit:ankit12345@node-app-cluster.fg3es.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));
// Using mongoose


// register view engine
app.set('view engine', 'ejs');

// listen for requests
// app.listen(3000); it is now inside the database connection logic

// Static files
app.use(express.static('public'));

// Middleware
app.use(express.urlencoded({ extended: true }));
// it takes all the url encoded data from the form and pass it as an object

// Using Middleware morgan
app.use(morgan('dev'));

//// Routes 
app.get('/', (req, res) => {

    // redirected to the /blogs page
    res.redirect('blogs');
});

app.get('/about', (req, res) => {

    // Using the view engine
    res.render('about', {title: 'About'});
});

// blog routes
// getting all the blogs from db
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'Home | All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err); 
        })
    // sorted by descending order of submission
})

// saving the blog to db
app.post('/blogs', (req, res) => {
    // console.log(req.body);
    
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        });

})


app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a New Blog'});
})

// showing a single blog as the id
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id; 
    // it means the :id provided with the address
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch((err) => {
            console.log(err);
        })
})

// Deletion of a blog
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id; 
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
            // sending this to the frontend js of the details
        })
        .catch(err => console.log(err));
})

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: 'Page Not Found'});
});
// This should stay at the very bottom

// Updating process
// const id = req.params.id; 
// const title = 'I am GOD!'+'of Gaming';
// Blog.findByIdAndUpdate(id, { title: title})
//     .then(result => {
//         res.json({ redirect: '/blogs' });
//     })
//     .catch(err => console.log(err));