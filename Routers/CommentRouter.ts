
import express from 'express'
// import jsonfile from 'jsonfile'
import { CommentService } from "../services/CommentService"
import { Request, Response } from 'express'
// import bodyParse from 'body-parser';
// import path from "path"
export class CommentRouter {
    constructor(private commentService: CommentService) {
    };

    router() {
        const router = express.Router();
        const upload_path = "/:category/:dish"; // :category is variable refer to Js file ${category}
        router.get(upload_path, this.getComment);
        router.patch(upload_path, this.updateComment);
        router.delete(upload_path, this.deleteComment);
        router.post(upload_path, this.createComment);
        router.put(upload_path, this.createReply);
        return router;
    }
    //ok
    createComment = async (req: Request, res: Response) => {
        try {
            const username = req.session?.username.username.split('@')[0];
            console.log(username);
            const userIcon = "Hi.jpg";
            const comment = req.body.content.comment;
            const editTime = new Date().toLocaleString();
            if (comment == '') {
                res.status(400).json({ message: 'The comment is empty~😢' });
                return;
            }
            if (!username) {
                res.status(401).json({ message: 'Unauthorized😢' });
                return;
            }
            //const dataset = await this.commentService.createComment(req.params.category, req.params.dish, username, userIcon, comment, editTime);
            res.json({ message: 'Success😚' });

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "error" });
        }
    }
    //not related
    getComment = async (req: Request, res: Response) => {
        try {
            const comments = await this.commentService.getCommentJson(req.params.category, req.params.dish);
            res.send(comments);
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'err' });
        }
    }
    //ok
    updateComment = async (req: Request, res: Response) => {
        try {
            if (!req.body.content.comment) {
                res.status(400).json({ message: 'Its empty 😒' });
                return;
            }
            
            // if (!username){
            //     res.status(401).json({ message: 'Unauthorized😢' });
            //     return;
            // }
            req.body.content.editTime = new Date().toLocaleString();

            const comment = await this.commentService.updateComment(req.params.category, req.params.dish, req.body.orderID, req.body.content, req.session?.username.username);
            if (!comment){
                res.json({ message: 'wrong person' });
                return;
            }
            res.json({ message: 'Success 👏🏿' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'err' });
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        try {
            // if (!username){
            //     res.status(401).json({ message: 'Unauthorized😢' });
            //     return;
            // }
            const comments = await this.commentService.deleteComments(req.params.category, req.params.dish, req.body.orderID, req.session?.username.username);
            if (!comments){
                res.json({ message: 'wrong person' });
                return;
            }
            res.json({ message: 'Success 👏🏿' });

            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'err' })
        }
    }

    createReply = async (req: Request, res: Response) => {
        try {
            const username = req.session?.username.username.split('@')[0];
            const userIcon = "Hi.jpg"
            const comment = req.body.content.comment;
            const orderID = req.body.content.orderID;
            const editTime = new Date().toLocaleString();
            if (!username) {
                res.status(401).json({ message: 'Unauthorized😢' });
                return;
            }
            if (comment == '') {
                res.status(400).json({ message: 'The comment is empty~😢' });
                return;
            }

            const dataset = await this.commentService.createReply(req.params.category, req.params.dish, username, userIcon, comment, orderID, editTime);

            if (!dataset) {
                res.status(500).json({ message: 'err' })
                return
            }
            res.json({ message: 'Success😚' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'err' })
        }
    }
}