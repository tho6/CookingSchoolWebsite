import { Request, Response, NextFunction } from 'express';

export function isLoggedInHtml(req: Request, res: Response, next: NextFunction) {
    console.log("step isLoggedIn");
    if (req.session?.username) {
        console.log("step isLoggedIn TRUE");
        next();
    } else {
        res.redirect('/');
    }
}