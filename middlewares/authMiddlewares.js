const { HttpError } = require('../errorshandlers/index');
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
        if (!user) {
        return next(HttpError(401, 'Email or password is wrong'));
        }
        req.body = value;
        next();
    };
    return f;
};

// config multer storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cbk) => {
        cbk(null, 'tmp');
    },
    filename: (req, file, cbk) => {
        const extension = file.mimetype.split('/')[1];
        cbk(null, `${req.user.id}-${nanoid()}.${extension}}`)
    }
});
//const multer filter
const multerFilter = (req, file, cbk) => {
    if (file.mimetype.startsWith('image/')) {
        cbk(null, true);
    } else {
        cbk(new HttpError(400, 'Please upload images only'), false)
    }
};

//create multer middlewares
const uploadUserAvatar = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
}).single('avatar');

module.exports = { checkUser, checkUserLogin, uploadUserAvatar };