
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
        router.patch(upload_path, this.updateComment);
        router.delete(upload_path, this.deleteComment);
        router.post(upload_path, this.createComment);
        router.put(upload_path, this.createReply);
        return router;
    }

    createComment = async (req: Request, res: Response) => {
        try {
            const username = req.body.content.username;;
            const userIcon = req.body.content.userIcon;
            // const heading = req.body.content.heading;
            const comment = req.body.content.comment;
            const editTime = new Date().toLocaleString();
            if (comment==''){
                res.status(400).json({message: 'The comment is empty~😢'});
                return;
            }
            const dataset = await this.commentService.createComment(req.params.category, req.params.dish, username, userIcon, comment, editTime);
            res.json({message: 'Success😚'});
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
            if (!req.body.content.comment){
                res.status(400).json({message: 'Its empty 😒'});
                return;
            }
            req.body.content.editTime = new Date().toLocaleString();
            console.log(req.body.outerID)

            if(req.body.outerID){
                console.log('yes')
                const comment = await this.commentService.updateReply(req.params.category, req.params.dish, req.body.orderID, req.body.outerID, req.body.content);
                res.json({message: 'Success 👏🏿'});
            }else {
                const comment = await this.commentService.updateComment(req.params.category, req.params.dish, req.body.orderID, req.body.content);
                res.json({message: 'Success 👏🏿'});
            }
            // res.header("Content-Type", "application/json; charset=utf-8").send(req.params)
        }catch (err){
            console.log(err);
            res.status(500).json({message: err});
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        try{
            if (req.body.replyTrash){
                // console.log(req.body.outerID)
                const comments = await this.commentService.deleteReplies(req.params.category, req.params.dish, req.body.orderID, req.body.outerID);
                res.send(comments);
            }else{
                const comments = await this.commentService.deleteComments(req.params.category, req.params.dish, req.body.orderID);
                res.send(comments);
            }
            return;
        } catch(err) {
            console.log(err);
            res.status(500).json({message: err})
        }
    }

    createReply = async (req: Request, res: Response) => {
        try{
            const username = req.body.content.username;;
            const userIcon = req.body.content.userIcon;
            const comment = req.body.content.comment;
            const orderID = req.body.content.orderID;
            const outerID = req.body.content.outerID;
            const editTime = new Date().toLocaleString();
            if (comment==''){
                res.status(400).json({message: 'The comment is empty~😢'});
                return;
            }
            if (!outerID){
                const dataset = await this.commentService.createReply(req.params.category, req.params.dish, username, userIcon, comment, orderID, editTime);
            }else{
                const dataset = await this.commentService.createReply(req.params.category, req.params.dish, username, userIcon, comment, orderID, editTime, outerID);

            }

            res.json({message: 'Success😚'});
            
        } catch(err) {
            console.log(err);
            res.status(500).json({message: err})
        }
    }
}