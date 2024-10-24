require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

exports.protected = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};