import express, {Request, Response} from 'express'

export class TestingRouter {

	router() {
		const router = express.Router();
		router.get("/", this.get);
		return router;
	}

	get = (req: Request, res: Response) => {
		const user = req.session?.user;
		console.log(user);
		res.status(200).end();
	}
}
