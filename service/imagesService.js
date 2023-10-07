const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const originalAvatar = await Jimp.read(tempUpload);
  await originalAvatar.resize(250, 250).writeAsync(tempUpload);

class ImageService {
    static initUploadMiddleware(name) {
        const multerStorage = multer.diskStorage({
    destination: (req, file, cbk) => {
        cbk(null, 'tmp');
    },
    filename: (req, file, cbk) => {
        const extension = file.mimetype.split('/')[1];
        cbk(null, `${req.user.id}-${nanoid()}.${extension}}`)
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
  }