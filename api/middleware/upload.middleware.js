const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'api/uploads')));
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb( null, './api/uploads');
  },
  filename: function(req, file, cb){
    cb( null, Date.now() + file.originalname);
  },

})
const upload = multer({
  storage: storage,
  limits:{
    fieldSize:1024 * 1024 * 3,
  },
})
 module.exports = upload;