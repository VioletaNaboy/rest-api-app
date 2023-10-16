const { HttpError } = require('../errorshandlers/index');
const ImageService = require('../service/imagesService');
const { checkUserExists } = require('../service/index');
const multer = require('multer');
const nanoid = require('nanoid');

const checkUser = schema => {
    const f = async (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
      
        if (Object.keys(req.body).length === 0) {
       
            return next(HttpError(400, 'missing fields'));
        }
        if (error) {
            return next(HttpError(400, error));
        }
        
        const user = await checkUserExists({ email: value.email });
        if (user) {
        return next(HttpError(409, "Email in use"));
        }
        req.body = value;
        next();
    };
    return f;
};
const checkUserLogin = schema => {
    const f = async (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
      
        if (Object.keys(req.body).length === 0) {
       
            return next(HttpError(400, 'missing fields'));
        }
        if (error) {
            return next(HttpError(400, error));
        }
        
        const user = await checkUserExists({ email: value.email });
        if (!user || user.verify === false ) {
        return next(HttpError(401, 'Email or password is wrong'));
        }
        req.body = value;
        next();
    };
    return f;
};
const checkUserVerification = schema => {
    const f = async (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
      
        if (Object.keys(req.body).length === 0) {
       
            return next(HttpError(400, 'missing fields'));
        }
        if (error) {
            return next(HttpError(400, error));
        }
        
        const user = await checkUserExists({ email: value.email });

         if (!user) {
        return next(HttpError(404, 'Not found'));
        }
        if (user.verify === true ) {
        return next(HttpError(400, 'Verification has already been passed'));
        }
        req.body = value;
        next();
    };
    return f;
};
const uploadUserAvatar = ImageService.initUploadMiddleware('avatar');
module.exports = { checkUser, checkUserLogin, uploadUserAvatar, checkUserVerification };