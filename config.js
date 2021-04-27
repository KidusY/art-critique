require('dotenv').config();

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
}

module.exports = config;