const { HttpError } = require('../errorshandlers/index');
const { isValidObjectId } = require('mongoose');

const validateData = schema => {
  const f = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
      if (Object.keys(req.body).length === 0) {
          
        // if (req.method === 'PATCH') {
        // next(HttpError(400, 'missing field favorite'));
        // }
          
        return next(HttpError(400, 'missing fields'));
    }
    if (error) {
      return next (HttpError(400, error));
    }
    next();
  }
return f;
}



const checkId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId} is not valid id`))
  }
  next();
}

module.exports = { validateData, checkId };