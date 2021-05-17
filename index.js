require('dotenv').config();

const db_URL = process.env.DATABASE_URL

const express = require('express');
const cors = require('cors');
const app = express();

const UsersRoute = require('./routes/users');
const CommentsRoute = require('./routes/comments');
const PostRoute = require('./routes/posts');
const Login = require('./routes/login');

const mongoose = require('mongoose');
mongoose.connect(db_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', error => console.log(error))
db.on('open', () => console.log("Connected to Mongoose"));


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send("Welcome to Art-Critique"));

app.use('/users',UsersRoute);
app.use('/comments', CommentsRoute);
app.use('/posts', PostRoute);
app.use('/login', Login);

app.listen(process.env.PORT || 8000)

