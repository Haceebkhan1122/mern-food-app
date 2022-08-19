const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(404).json({ message: "Not authorized!" })
    }

    const token = authorization.split(" ")[1]

    if (!token) {
        return res.status(404).json({ message: "Not authorized!" })
    }

    try {
        const decode = jwt.verify(token, 'secret123');
        console.log(decode)
        req.userData = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}