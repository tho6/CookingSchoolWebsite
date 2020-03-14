import path from 'path'
import jsonfile from 'jsonfile'




export class CommentService{
    
    async getCommentJson(category: string, dish: string) {
        return await jsonfile.readFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`));
    }

    async createComment(category: string, dish: string, username: string, userIcon: string, heading: string, comment: string, editTime: string) {
        const dataset = await this.getCommentJson(category, dish);
        const userdata = {
            username,
            userIcon,
            heading,
            comment,
            editTime
        };
        dataset.push(userdata);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
        return userdata;
    }

    async updateComment(category: string, dish: string, orderID: string, commentOpt:{heading?: string, comment?: string, editTime: number}) {
        
        const comments = await this.getCommentJson(category, dish);
        const order = parseInt(orderID);
        const comment = comments[order];
        console.log(comment);
        Object.assign(comment, commentOpt);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

    async deleteComments(category: string, dish: string, orderID: string){
        const comments = await this.getCommentJson(category, dish)
        const order = parseInt(orderID);
        comments.splice(order, 1)
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

}