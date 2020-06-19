import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";
import { isLoggedInHtml } from "./guards";
import { CommentRouter } from "./routers/CommentRouter"
import { CommentService } from "./services/CommentService"
import path from 'path'
// import jsonfile from 'jsonfile'

import multer from 'multer' // auto change the photo filename and put photo file to upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.category}_${req.body.dish}.${file.mimetype.split('/')[1]}`); // category and dish refer to html form name tag
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
  expressSession({
    secret: "Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
import dotenv from 'dotenv';
dotenv.config();
import grant from 'grant-express';
app.use(grant({
  "defaults": {
    "protocol": "http",
    "host": "localhost:8080",
    "transport": "session",
    "state": true,
  },
  "google": {
    "key": process.env.GOOGLE_CLIENT_ID || "",
    "secret": process.env.GOOGLE_CLIENT_SECRET || "",
    "scope": ["profile", "email", ""], // icon
    "callback": "/users/login/google"
  },
}));

import { UserService } from './services/UserService';
import { UserRouter } from './routers/UserRouter';
import { VideoService } from './Services/videoService'
import { VideoRouter } from './Routers/videoRouter'


const userService = new UserService();
const userRouter = new UserRouter(userService);
const API_VERSION = "/api/v1"
const commentService = new CommentService();
const commentRouter = new CommentRouter(commentService);

const videoService = new VideoService()
const videoRouter = new VideoRouter(videoService, upload)



app.use("/users", userRouter.router());
app.use(isLoggedInHtml, express.static(path.join(__dirname, './Private')));
app.use(`${API_VERSION}/comment`, commentRouter.router());
// app.get('/(\S+)_(\S+)\.html', (req, res) => {
//   res.sendFile(__dirname + '/template.html')
// })
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')))
app.use(videoRouter.router())



// app.delete('/videos/:id', async (req, res) => {
//     if (req.session.username === 'chingching6@gmail.com') {
//       res.json({ success: true, message: 'Is Admin' })
//     return;
//   }
  
//   const videos = await jsonfile.readFile('/videos.json')
//   const { id } = req.params
//   videos.splice(id, 1)

//   await jsonfile.writeFile('/videos.json', videos);

//   res.json({ success: true })
//   // } catch (e) {
//   //   console.error(e);
//   //   res.status(500).json({ success: false });
//   // }

//   above try admin

  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });