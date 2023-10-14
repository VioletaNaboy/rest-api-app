const { validateData, checkId } = require('./validateData');
const { checkUser, checkUserLogin, checkUserVerification, uploadUserAvatar } = require('./authMiddlewares');
const {protect} = require('./authenticateMiddlewares')
module.exports = {
  validateData, checkId, checkUser, checkUserLogin, checkUserVerification, uploadUserAvatar, protect
}