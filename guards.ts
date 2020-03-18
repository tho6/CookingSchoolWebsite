import { Request, Response, NextFunction } from 'express';

export function isLoggedInHtml(req: Request, res: Response, next: NextFunction) {
    console.log("step isLoggedIn");
    if (req.session?.user) {
        console.log("step isLoggedIn TRUE");
        next();
    } else {
        res.redirect('/login.html');
    }
}

export function isLoggedInApi(req: Request, res: Response, next: NextFunction) {
    console.log("step isLoggedIn");
    if (req.session?.user) {
        console.log("step isLoggedIn TRUE");
        next();
    } else {
        res.status(401).json({message: "no API login"});
    }
}