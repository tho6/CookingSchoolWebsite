import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer' // auto change the photo filename and put photo file to upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.category}_${req.body.dish}_${Date.now()}.${file.mimetype.split('/')[1]}`); // category and dish refer to html form name tag
  }
})

const upload = multer({ storage: storage })


const app = express()

app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import {VideoService} from './Services/videoService'
import {VideoRouter} from './Routers/videoRouter'
const videoService = new VideoService()
const videoRouter = new VideoRouter(videoService,upload)
 
app.use(videoRouter.router())



app.listen(8080, () => {
  console.log('Listening on port 8080')
})
