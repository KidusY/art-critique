require('dotenv').config();

const db_URL = process.env.DATABASE_URL

const express = require('express');
const cors = require('cors');
const app = express();

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

app.listen(process.env.PORT || 8000)

