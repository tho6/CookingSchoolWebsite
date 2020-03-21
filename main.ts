import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";
import { isLoggedInHtml } from "./guards";
import {CommentRouter} from "./routers/CommentRouter"
import {CommentService} from "./services/CommentService"

import path from 'path'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  expressSession({
    secret: "Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

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


const userService = new UserService();
const userRouter = new UserRouter(userService);
const API_VERSION = "/api/v1"
const commentService = new CommentService();
const commentRouter = new CommentRouter(commentService);

app.use(`${API_VERSION}/comment`, commentRouter.router());
app.use(express.static(path.join(__dirname, './public')));
app.use("/users", userRouter.router());
app.use(isLoggedInHtml, express.static(path.join(__dirname, './private')));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});