const { HttpError } = require('../errorshandlers/index');


const checkUser = schema => {
    const f = async (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
      
        if (Object.keys(req.body).length === 0) {
       
            return next(HttpError(400, 'missing fields'));
        }
        if (error) {
            return next(HttpError(400, error));
        }

        // await checkId({ email: value.email });
        // req.body = value;
        next();
    };
    return f;
};

// const checkId = (req, res, next) => {
//   const { userId } = req.params;
//   if (isValidObjectId(userId)) {
//     next(HttpError(404, `${userId} is not valid id`))
//   }
//   next();
// }

module.exports = { checkUser };