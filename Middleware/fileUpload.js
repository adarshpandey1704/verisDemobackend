const multer = require('multer');

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Uploads/audio');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),

});

module.exports = fileUpload;
