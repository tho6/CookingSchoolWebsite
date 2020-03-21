import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";
import { isLoggedInHtml, isLoggedInApi } from "./guards";
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
import { TestingRouter } from './routers/TestingRouter';

const userService = new UserService();
const userRouter = new UserRouter(userService);
const testingRouter = new TestingRouter();

const API_VERSION = "/api/v1"
app.use("/users", userRouter.router());
app.use(`${API_VERSION}/testing`, isLoggedInApi, testingRouter.router());

app.use(express.static(path.join(__dirname, './public')));
app.use(isLoggedInHtml, express.static(path.join(__dirname, './private')));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});