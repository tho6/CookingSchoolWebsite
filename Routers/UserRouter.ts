import express, { Request, Response } from "express";
import fetch from 'node-fetch'
import { UserService } from "../services/UserService";
import { checkPassword } from "../hash";

// import { isLoggedInApi } from "../guards"

export class UserRouter {
  constructor(private userService: UserService) { }

  router() {
    const router = express.Router();
    // router.post("/", isLoggedInApi, this.createUser);
    router.get("/login/google", this.loginGoogle);
    router.post("/", this.createUser);
    router.post("/login", this.login);
    router.get("/logout", this.logout);
    return router;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        res.status(400).json({ message: "Duplicate" });
        return;
      }
      const userId = await this.userService.createUser(username, password);
      res.json({ user_id: userId });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  login = async (req: Request, res: Response) => {
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
      return res.redirect("/");
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


  loginGoogle = async (req: express.Request, res: express.Response) => {
    console.log("in google?")
    const accessToken = req.session?.grant.response.access_token;
    const fetchRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const result = await fetchRes.json();
    const users = await this.userService.getUsers();
    const user = users.find(user => user.username == result.email);
    let tmpUserId: number;
    // if (!user) {
    //   return res.status(401).redirect("/login.html?error=Incorrect+Username");
    // }
    // if (req.session) {
    //   req.session.user = {
    //     id: user.id
    //   };
    //   console.log("search user")
    //   return res.redirect("/");
    // }
      if (!user) {
        console.log("first time")
        tmpUserId = await this.userService.createUser(result.email, "password");
      } else {
        console.log("second time")
        tmpUserId = user.id;
      }
      if (req.session) {
        req.session.user = {
          id: tmpUserId
        };
        return res.redirect("/");
      }
  };
}