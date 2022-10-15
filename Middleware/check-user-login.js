const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error');

module.exports = (req,res,next) => {
    if (req.method === 'OPTIONS') {
        return next();
      }
      try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
          throw new Error('Authentication failed! asdasd');
        }
        const decodedToken = jwt.verify(token, 'supersupersecret');
        req.userData = { userId: decodedToken.userId, userRole: decodedToken.role };
        role = decodedToken.role;
        if(role==="user"||role=="admin")
            next();
        else
            return res.json({
                "message" : "Authorization Failed! Please login first."
            })
      } catch (err) {
        const error = new HttpError('Authentication failed! dasdasd', 403);
        return next(error);
      }
}