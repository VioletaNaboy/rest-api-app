const { signupUser, loginUser, logoutUser, updateUser, updateUserAvatar } = require('../service/index');
const signup = async (req, res, next) => {
    try {
      const user = await signupUser(req.body);
        return res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
  } catch (error) {
    next(error)
  }
  
}
const login = async (req, res, next) => {
    try {
        const {user, token} = await loginUser(req.body);
        res.status(201).json({user: {
      email: user.email,
      subscription: user.subscription,
    }, token});
    } catch (error) {
        next(error)
    }
}

const getCurrent = async (req, res, next) => {
    try {
      const { email, subscription} = req.user;
      res.json({
            email,
            subscription,
        });
    } catch (error) {
        next(error);
    }
}

const updateAvatar = async (req, res, next) => {
    try {
      const updatedUser = await updateUserAvatar(req.body, req.user, req.file);
      res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}


const logout = async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await logoutUser(id)
      res.status(204).json("Logouted user");  
    } catch (error) {
        next(error);
    }
}

const updateUserSubscription = async (req, res, next) => {
  try {
const { subscription } = req.body;
const { id } = req.user;
const user = await updateUser(id, subscription);

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.status(200).json({user: {
      email: user.email,
      subscription: user.subscription,
    }});
   }
  catch (error) {
    next(error);
  }
}
module.exports = { login, signup, getCurrent, logout, updateUserSubscription, updateAvatar }