// server site 
// post must be redirect, if no redirect , will go to localhost:8080/memos website
// 
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer' // auto change the photo filename and put photo file to upload folder
import jsonfile from 'jsonfile'
import expressSession from 'express-session';


// multer standard syntax
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})

const upload = multer({storage: storage})
// multer standard syntax



const app = express()

// 增強 express 的功能
// Middleware (未講)
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')) )
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')) )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(8080, () => {
  console.log('Listening on port 8080')
})
