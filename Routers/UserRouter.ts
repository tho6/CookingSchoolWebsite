import express, { Request, Response } from "express";
import fetch from 'node-fetch'
import { UserService } from "../services/UserService";
import { checkPassword } from "../hash";


export class UserRouter {
  constructor(private userService: UserService) { }

  router() {
    const router = express.Router();
    router.get("/login/google", this.loginGoogle);
    router.post("/", this.createUser);
    router.post("/login", this.login);
    router.get("/logout", this.logout);
    router.get("/getCurrentUser", this.getCurrentUser);

    return router;
  }

  checkSession = (req: Request, res: Response) => {
    if (req.session) {
      console.log(req.session);
    }
    res.send("show test"); // change
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, picture } = req.body;
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        res.status(400).json({ message: "Duplicate" });
        return;
      }
      const userId = await this.userService.createUser(username, password, picture);
      res.json({ user_id: userId });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  login = async (req: Request, res: Response) => { // remove later
    const { username, password } = req.body;
    const user = await this.userService.getUserByUsername(username);
    console.log("step 1");
    console.log(user);
    if (!user) {
      console.log("1A");
      return res.status(401).redirect("/login.html?error=Incorrect+Username");
    }
    const match = await checkPassword(password, user.password);
    if (match) {
      console.log("step 2");
      if (req.session) {
        req.session.username = "abcde";
      }
      return res.redirect("/");
    } else {
      console.log("2A");
      return res.status(401).redirect("/login.html?error=Incorrect+Username");
    }
  };

  logout = async (req: express.Request, res: express.Response) => {
    if (req.session) {
      delete req.session.username;
    }
    console.log("3A");
    res.redirect("/");
  };

  getCurrentUser = (req: express.Request, res: express.Response) => {
    if (req.session?.username) {
      console.log(req.session.username)
      console.log("NEW")
      res.send(req.session.username)
      return
    }
    res.send({ 'username': false })
  }

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
    // @ts-ignore
    let tmpUserId: number
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
    console.log(result) // full profile
    if (!user) {
      console.log("first time")
      tmpUserId = await this.userService.createUser(result.email, "password", result.picture);
    } else {
      console.log("second time")
      tmpUserId = user.id;
    }
    if (req.session) {
      if (user?.username === 'chingching6@gmail.com') {
        req.session.username = { 'username': user?.username, 'isAdmin': true };
        // res.json({ role: 'admin' })
        console.log('admin');
      } else {
        req.session.username = { 'username': user?.username, 'isAdmin': false };
        // res.json({ role: 'guest' })
        console.log('guest');
      }
    };

    console.log(req.session?.username) // get session user id

    // req.session.username = "abcde"; // test

    return res.redirect("/");
  }
}
