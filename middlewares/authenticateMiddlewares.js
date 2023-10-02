const jwt = require('jsonwebtoken');
const { HttpError } = require('../errorshandlers/index');
const User = require('../service/schemas/auth');
const { checkToken } = require('../service/jwtService');
const protect = async (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];
  try {
      const userId = checkToken(token);
      const currentUser = await User.findById(userId);
      if (!currentUser) {
          throw HttpError(401, 'Not authorized');
      }
      req.user = currentUser;
      next();
  }
  catch {
    next(HttpError(401, 'Not authorized'));
  }
}

module.exports = { protect };