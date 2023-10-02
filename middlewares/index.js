const { validateData, checkId } = require('./validateData');
const { checkUser, checkUserLogin } = require('./authMiddlewares');
const {protect} = require('./authenticateMiddlewares')
module.exports = {
  validateData, checkId, checkUser, checkUserLogin, protect
}