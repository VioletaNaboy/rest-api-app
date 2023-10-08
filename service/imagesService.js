const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { HttpError } = require('../errorshandlers/index')
class ImageService {
    static initUploadMiddleware(name) {
        const multerStorage = multer.diskStorage({
    destination: (req, file, cbk) => {
        cbk(null, 'tmp');
    },
    filename: (req, file, cbk) => {
        const extension = file.mimetype.split('/')[1];
        cbk(null, `${req.user.id}.${extension}`)
    }
});
const multerFilter = (req, file, cbk) => {
    if (file.mimetype.startsWith('image/')) {
        cbk(null, true);
    } else {
        cbk(new HttpError(400, 'Please upload images only'), false)
    }
        };
        return multer({
            storage: multerStorage,
            fileFilter: multerFilter
        }).single(name);
      }

    static async save(file, options, ...pathSegments) {
        if (file.size > (options?.maxSize ? options.maxSize  * 1024 * 1024 : 1 * 1024 * 1024)) throw new HttpError(400, 'File is too big');
        const tempFilePath = file.path;
        const fullAvatarPath = path.join(process.cwd(), ...pathSegments, file.filename);
        const avatar = await Jimp.read(tempFilePath);
        avatar.resize(250, 250).write(tempFilePath);
        await fs.rename(tempFilePath, fullAvatarPath);
        return path.join('avatars', file.filename);
    }
}
module.exports = ImageService;