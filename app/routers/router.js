let express = require('express');
let router = express.Router();
let upload = require(`../config/multer.config.js`);

const csvworker = require(`../controllers/csv.controllers.js`);
let path = __basedir = "/views/";

router.get('/', (req, res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "index.html");
});

router.post('/api/file/upload', upload.single("file"), csvworker.uploadfile);
router.post('/api/file/multiple/upload', upload.array('files', 4), csvworker.uploadfile);
router.get ('/api/file', csvworker.downloadfile);

module.exports = router;