import path from 'path'
import jsonfile from 'jsonfile'
// import {CommentDataset} from '../models/comment'
export class CommentService{
    //work work
    async getCommentJson(category: string, dish: string) {
        return await jsonfile.readFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`));
    }
    //work but seems useless
    async getSpecificComment(category: string, dish: string, checkID:number) {
        let {comments} = await this.getCommentJson(category, dish)
        //console.log({comments})
        const comment = comments.find((Comment:any) => Comment.id==checkID) 
        return comment;
    }
    //work work
    async createComment(category: string, dish: string, username: string, userIcon: string, comment: string, editTime: string) {
        const dataset = await this.getCommentJson(category, dish);
        const userdata = {
            id: dataset.nextid++,
            username,
            userIcon,
            comment,
            replies : [],
            referring:[],
            editTime
        }
        dataset.comments.unshift(userdata);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
        return userdata;
    }

    //work work
    async updateComment(category: string, dish: string, orderID: number, commentOpt:{comment?: string, editTime: number}, username: string) {
        const dataset = await this.getCommentJson(category, dish);
        const idx = await this.checkID(category, dish, orderID);
        const comments = dataset.comments
        const newUsername = username.split('@')[0];
        if (idx){
            if (idx.length ===1){
                if (comments[idx[0]].username !== newUsername){
                    return false
                }
                Object.assign(comments[idx[0]], commentOpt);
            }else if (idx.length ===2){
                if (comments[idx[0]].replies[idx[1]].username !== newUsername){
                    return false
                }
                Object.assign(comments[idx[0]].replies[idx[1]], commentOpt);
            }
        }

        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), dataset);
        return dataset.comments;
    }

    //useless not work
    async updateReply(category: string, dish: string, orderID: number, outerID: number, commentOpt:{comment?: string, editTime: number}) {
        const comments = await this.getCommentJson(category, dish);
        const comment = comments[outerID].replies[orderID];
        Object.assign(comment, commentOpt)
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

    //workwork
    async checkID(category: string, dish: string, orderID:number){
        const dataset = await this.getCommentJson(category, dish)
        let commentIndex = dataset.comments.findIndex((comment:any) => (comment.id==orderID));
        // console.log(commentIndex)
        if (commentIndex !== -1){
            return [commentIndex];
        }
        
        for (const comment in dataset.comments){
            const replies = dataset.comments[comment].replies
            if (replies.length !== 0 ){
                // console.log(replies)
                // console.log(replies.length)
                commentIndex = replies.findIndex((comment:any) => (comment.id==orderID));
                console.log(commentIndex)
                if (commentIndex>=0){
                    // console.log(commentIndex)
                    return [comment, commentIndex];
                }
            }
        }
        return null;

    }
    //work work
    async deleteComments(category: string, dish: string, orderID: number, username:string){
        const dataset = await this.getCommentJson(category, dish)
        // const order = parseInt(orderID);
        // console.log(orderID);
        const idx = await this.checkID(category, dish, orderID);
        const comments = dataset.comments
        const newUsername = username.split('@')[0];
        if (idx){
            if (idx.length ===1){
                if (comments[idx[0]].username !== newUsername){
                    return false
                }
                comments.splice(idx[0], 1)
            }else if (idx.length ===2){
                if (comments[idx[0]].replies[idx[1]].username !== newUsername){
                    return false
                }
                comments[idx[0]].replies.splice(idx[1], 1)
            }
        }
        
        
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), dataset);
        return dataset.comments;
    }

    //work work
    async createReply(category: string, dish: string, username: string, userIcon: string, comment: string, orderID: number, editTime: string) {
        const dataset = await this.getCommentJson(category, dish);
        const comments = dataset.comments;
        let referring:number[] = [];
        let orginalComment;
        const idx = await this.checkID(category, dish, orderID);

        if (idx){
            if (idx.length ===1){
                orginalComment = comments[idx[0]]
            }else if (idx.length ===2){
                orginalComment = comments[idx[0]].replies[idx[1]];
            }
        }
        if (orginalComment.referring.length>0){
            referring = orginalComment.referring.concat(referring);
        }

        referring.push(orginalComment.id)
        const userdata = {
            id: dataset.nextid++,
            username,
            userIcon,
            comment,
            replies : [],
            referring: referring,
            editTime
        }
        if (idx){
            comments[idx[0]].replies.push(userdata);
        }
        // dataset.comments.unshift(userdata);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
        
        return userdata;
    }

    //work but useless
    async deleteReplies(category: string, dish: string, orderID: number, outerID?: number){
        const dataset = await this.getCommentJson(category, dish)
        const commentIdx = dataset.comments.findIndex((comment:any) =>comment.id == orderID);
        dataset.comments.splice(commentIdx, 1)
        
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), dataset);
        return dataset.comments;
    }
}