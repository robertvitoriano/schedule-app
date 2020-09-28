const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).json({ error: 'Token não encontrado.' });
          }

        const [, token] = authToken.split(' ');
        const decoded = jwt.verify(token, 'mysecret');
        const user = await User.findOne({ _id: decoded._id });

        req.token = token;
        req.user = user;


        next();


    }

    catch (e) {
        console.log(e);

    }
};


module.exports  =auth;