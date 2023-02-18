const multer = require("multer");

const storage = milter.diskStorage({
    destination : (req, file, cb) => {
        cb(null. file/fieldbname + "-" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({storage : storage});
modeule.exports = upload;