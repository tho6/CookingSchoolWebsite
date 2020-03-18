// // server site 
// // post must be redirect, if no redirect , will go to localhost:8080/memos website
// // 
// import express from 'express'
// import bodyParser from 'body-parser'
// import path from 'path'
// import multer from 'multer' // auto change the photo filename and put photo file to upload folder
// import jsonfile from 'jsonfile'
// import expressSession from 'express-session';


// // multer standard syntax
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//   }
// })

// const upload = multer({ storage: storage })
// // multer standard syntax

// // 增強 express 的功能
// // Middleware (未講)
// app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))
// app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())





// cookie header

// import express from 'express'
// // import bodyParser from 'body-parser'
// import path from 'path'
// import expressSession from 'express-session';
// import { request } from 'http';

// const app = express()

// app.use(express.static(path.join(__dirname, 'Public')))

// app.use(expressSession({
//   secret: 'secret session',
//   resave: true,
//   saveUninitialized: true
// }));

// if (req.session) { // 登入太密?
//   if (req.session.submission == null) {
//     req.session.submission = 0;
//   }
//   req.session.submission = req.session.submission + 1;

//   if (req.session.submission > 5) {
//     res.status(400).json({success: false, message: '請稍後再嘗試登入'})
//   }
// }

// // test wsp10 below
// app.post('/login', (req, res) => {
//   if (req.body.username === 'alex' && req.body.password === '1234') {
//     if (req.session) {
//       req.session.isAdmin = true;
//     }
//     res.json({success: true})
//   } else {
//     res.json({success: false})
//   }
// })

// app.listen(8080, () => {
//   console.log('Listening on port 8080')
// })


// below new wsp11

import express, { Request, Response } from "express";
// import fetch from 'node-fetch'
import { UserService } from "./services/UserService";
import { checkPassword } from "./hash";

// import { isLoggedInApi } from '../guards'
// import { checkIsBodyValid } from '../utils'

export class UserRouter {
  constructor(private userService: UserService) {}

  // router() {
  //   const router = express.Router();
  //   // router.post("/", isLoggedInApi, this.createUser);
  //   router.post("/", this.createUser);
  //   router.post("/login", this.login);
  //   router.get("/logout", this.logout);
  //   // router.get("/login/google", this.loginGoogle);
  //   return router;
  // }

  // createUser = async (req: Request, res: Response) => {
  //   try {
  //     // const { username, password } = req.body;
  //     // const user = await this.userService.getUserByUsername(username);
  //     if (user) {
  //       res.status(400).json({ message: "dup..." });
  //       return;
  //     }
  //     // const userId = await this.userService.createUser(username, password);
  //     // res.json({ user_id: userId });
  //   } catch (err) {
  //     res.status(500).json({ message: "in...." });
  //   }
  // }

  login = async (req: Request, res: Response) => {
    // try... catch... ?
    const { username, password } = req.body;
    const user = await this.userService.getUserByUsername(username);
    console.log("step 1");
    console.log(user);
    if (!user) {
      return res.status(401).redirect("/login.html?error=Incorrect+Username");
    }
    const match = await checkPassword(password, user.password);
    if (match) {
      console.log("step 2");
      if (req.session) {
        req.session.user = {
          id: user.id
        };
      }
      return res.redirect("/"); // To the protected page.
    } else {
      return res.status(401).redirect("/login.html?error=Incorrect+Username");
    }
  };

  logout = async (req: express.Request, res: express.Response) => {
    if (req.session) {
      delete req.session.user;
    }
    res.redirect("/login.html");
  };

  // loginGoogle = async (req: express.Request, res: express.Response) => {
  //   const accessToken = req.session?.grant.response.access_token;
  //   const fetchRes = await fetch(
  //     "https://www.googleapis.com/oauth2/v2/userinfo",
  //     {
  //       method: "get",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     }
  //   );
    // const result = await fetchRes.json();
    // const users = await this.userService.getUsers();
    // const user = users.find(user => user.username == result.email);
    // let tmpUserId: number;
    // if (!user) {
    //   console.log("first time")
    //   tmpUserId = await this.userService.createUser(result.email, "test");
    // } else {
    //   console.log("second time")
    //   tmpUserId = user.id;
    // }
    // if (req.session) {
    //   req.session.user = {
    //     id: tmpUserId
    //   };
    //   return res.redirect("/");
    // }
  };