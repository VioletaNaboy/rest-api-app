const { HttpError } = require('../controllers/HttpError')

const validateData = schema => {
  const f = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (Object.keys(req.body).length === 0) {
      return next(HttpError(400, 'missing data'));
    }
    if (error) {
      return next(HttpError(400, error));
    }
    next();
  }
return f;
}

module.exports = validateData;