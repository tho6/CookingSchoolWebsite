
import express from 'express'
// import jsonfile from 'jsonfile'
import {CommentService} from "../Services/CommentService"
import {Request, Response} from 'express'
// import bodyParse from 'body-parser';
// import path from "path"
export class CommentRouter{
    // private userJsonPath: string;
    constructor (private commentService: CommentService){
        // this.userJsonPath = path.join(__dirname, `../json/${req.params.category}_${req.params.dish}_comment.json`);
    };

    router() {
        const router = express.Router();
        const upload_path = "/:category/:dish";
        router.get(upload_path, this.getComment);
        router.put(upload_path, this.updateComment);
        router.delete(upload_path, this.deleteComment);
        router.post(upload_path, this.createComment);
        return router;
    }

    createComment = async (req: Request, res: Response) => {
        try {
            const username = "IVAN";
            const userIcon = "hi.jpg";
            const heading = req.body.content.heading;
            const comment = req.body.content.comment;
            const editTime = new Date().toLocaleString();
            const dataset = await this.commentService.createComment(req.params.category, req.params.dish, username, userIcon, heading, comment, editTime);
            res.send(dataset);
            // let dataset = await jsonfile.readFile(path.join(__dirname, `${req.params.category}_${req.params.dish}_comment.json`));
            
        }catch (err){
            console.log(err)
            res.status(500).json({message: "error"});
        }
    }

    getComment = async (req: Request, res: Response) => {
        try{
            const comments = await this.commentService.getCommentJson(req.params.category, req.params.dish);
            res.send(comments);
            return;
        }catch (err){
            console.log(err);
            res.status(500).json({message: err});
        }
    }

    updateComment = async (req: Request, res: Response) => {
        try{
            const comment = await this.commentService.updateComment(req.params.category, req.params.dish, req.body.orderID, req.body.content);
            // res.header("Content-Type", "application/json; charset=utf-8").send(req.params)
            console.log("hi")
            res.send(comment);
            return;
        }catch (err){
            console.log(err);
            res.status(500).json({message: err});
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        try{
            const comments = await this.commentService.deleteComments(req.params.category, req.params.dish, req.body.orderID)
            res.send(comments);
            return;
        } catch(err) {
            console.log(err);
            res.status(500).json({message: err})
        }
    }
}