const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv=require('dotenv');
dotenv.config();

cloudinary.config({ 
    cloud_name: 'dpcevmfx3', 
    api_key: '434537846761152', 
    api_secret: '4O6bndRDRlW4paSWn7wIb5vq_lY' 
});


const storage = multer.diskStorage({
    filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = function(req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
    }
    cb(null, true);
};


module.exports = multer({ storage: storage, fileFilter: imageFilter });