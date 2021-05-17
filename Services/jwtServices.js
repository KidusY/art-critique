const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const CommonServices = {
    hashPassword(password) {
        return bcrypt.hash(password, 12);
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash);
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, JWT_SECRET, {
            subject,
            algorithm: 'HS256'
        });
    },
    verifyJwt(token) {
        return jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256']
        });
    },
}

module.exports = CommonServices;