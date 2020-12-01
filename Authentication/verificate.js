const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decodedToken;
        next();
    }catch(error) {
        return res.status(401).send({
            error: 'Auth failed'
        });
    }
}