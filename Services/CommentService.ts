import path from 'path'
import jsonfile from 'jsonfile'

export class CommentService{
    
    async getCommentJson(category: string, dish: string) {
        return await jsonfile.readFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`));
    }

    async createComment(category: string, dish: string, username: string, userIcon: string, comment: string, editTime: string) {
        const dataset = await this.getCommentJson(category, dish);
        const userdata = {
            username,
            userIcon,
            comment,
            replies : [],
            editTime
        };
        dataset.unshift(userdata);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
        return userdata;
    }

    async updateComment(category: string, dish: string, orderID: string, commentOpt:{comment?: string, editTime: number}) {
        
        const comments = await this.getCommentJson(category, dish);
        const order = parseInt(orderID);
        const comment = comments[order];
        Object.assign(comment, commentOpt);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

    async updateReply(category: string, dish: string, orderID: number, outerID: number, commentOpt:{comment?: string, editTime: number}) {
        const comments = await this.getCommentJson(category, dish);
        // const order = parseInt(orderID);
        const comment = comments[outerID].replies[orderID];
        Object.assign(comment, commentOpt);
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

    async deleteComments(category: string, dish: string, orderID: number){
        const comments = await this.getCommentJson(category, dish)
        // const order = parseInt(orderID);
        // console.log(orderID);
        comments.splice(orderID, 1)
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }

    // async createReply(category: string, dish: string, username: string, userIcon: string, comment: string, orderID: number, editTime: string) {
    //     const dataset = await this.getCommentJson(category, dish);
    //     const userdata = {
    //         username,
    //         userIcon,
    //         comment,
    //         orderID,
    //         editTime
    //     };
    //     dataset[orderID].replies.unshift(userdata);
    //     await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
    //     return userdata;
    // }
    async createReply(category: string, dish: string, username: string, userIcon: string, comment: string, orderID: number, editTime: string, outerID?: number) {
        const dataset = await this.getCommentJson(category, dish);
        let referring = [];
        // const referTemp = []

        if (outerID){
            // console.log(dataset[outerID].re)
            for (let refer of dataset[outerID].replies[orderID].referring){
                referring.push(refer);
            }
        }
        if (outerID){
            referring.push({username: dataset[outerID].replies[orderID].username, 
                        userIcon: dataset[outerID].replies[orderID].userIcon,
                        comment: dataset[outerID].replies[orderID].comment,
                        editTime: dataset[outerID].replies[orderID].editTime,
                        orderID: dataset[outerID].replies[orderID].orderID})
        }else {
            referring.push({username: dataset[orderID].username, 
                userIcon: dataset[orderID].userIcon,
                comment: dataset[orderID].comment,
                editTime: dataset[orderID].editTime,
                orderID: dataset[orderID].orderID})
        }
        const userdata = {
            username,
            userIcon,
            comment,
            orderID,
            referring,
            editTime
        };
        dataset[outerID? outerID:orderID].replies.push(userdata);
        // dataset[outerID? outerID:orderID].referring.unshift(referring);
        // console.log(dataset[0].referring)

        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`),dataset);
        return ;
    }

    async deleteReplies(category: string, dish: string, orderID: number, outerID: number){
        const comments = await this.getCommentJson(category, dish)
        // const order = parseInt(orderID);
        // console.log(outerID)
        // console.log(comments)
        const comment = comments[outerID].replies;
        // console.log(comment[orderID])
        // console.log(orderID);
        comment.splice(orderID, 1)
        
        await jsonfile.writeFile(path.join(__dirname, `../commentsJson/${category}_${dish}_comment.json`), comments);
        return comments;
    }
}