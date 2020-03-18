import express from 'express'
// import url from 'url'
import bodyParser from 'body-parser'
import {CommentRouter} from "./routers/CommentRouter"
import {CommentService} from "./services/CommentService"
const app = express();

const API_VERSION = "/api/v1"
const commentService = new CommentService();
const commentRouter = new CommentRouter(commentService);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(`${API_VERSION}/comment`, commentRouter.router());
app.use(express.static('public'))

app.listen(8080, () => console.log("listening to port 8080"));