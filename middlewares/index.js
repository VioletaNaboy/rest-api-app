const { validateData, checkId } = require('./validateData');
const { checkUser } = require('./authMiddlewares')
module.exports = {
  validateData, checkId, checkUser
}