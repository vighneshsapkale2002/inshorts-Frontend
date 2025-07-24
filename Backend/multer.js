// This is multer means any file are uploaded on server or form to store file in server.

const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.filename + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file");


app.post("/upload", upload, (req, res) => {
    res.send('File Uploaded')
});
app.listen(6000);