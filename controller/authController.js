const { signupUser, loginUser } = require('../service/index');
const signup = async (req, res, next) => {
    try {
      
  const userService = await signupUser(req.body);
      res.status(201).json({
              msg: 'Success',
              user,
              token
          });
  } catch (error) {
    next(error)
  }
  
}
const login = async (req, res, next) => {
    try {
        const userService = await loginUser(req.body);
        res.status(201).json({
            msg: 'Success',
            user
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { login, signup }