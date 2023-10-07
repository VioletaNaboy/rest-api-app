const { validateData, checkId } = require('./validateData');
const { checkUser, checkUserLogin, uploadUserAvatar } = require('./authMiddlewares');
const {protect} = require('./authenticateMiddlewares')
module.exports = {
  validateData, checkId, checkUser, checkUserLogin, uploadUserAvatar, protect
}