import express from 'express'
import { Request, Response } from 'express'
import { CourseService } from '../Services/courseService'
import { upload } from '../Course'
export class CourseRouter {

  constructor(private courseService: CourseService) {

  }

  router() {
    const router = express.Router()
    router.get('/courses', this.getCourses)
    router.post('/courses', upload.single('image'), this.postCourse)
    router.delete('/courses/:id', this.removeCourse)
    router.get('/likes',this.getLike)
    return router
  }
  getCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getCourses()
      res.json(courses); // respond to index.js file (const memos = await fetchRes.json();) 
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false })
    }
  }
  postCourse = async (req: Request, res: Response) => {
    try {
      if (req.body.Classroom == null || req.body.Classroom == '') {
        res.status(400).json({ success: false, message: "please type something on text box" })
        return
      }
      await this.courseService.postCourse(req.body.Classroom, req.file)
      res.json({ success: true })
      res.redirect('/')
    } catch (e) {
      //console.log(e)
      res.status(500).json({ success: false })
    }
  }

  removeCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const idNum = parseInt(id)
      if (isNaN(idNum)) {
        res.status(400).json({ success: false })
        return
      }
      await this.courseService.removeCourse(idNum)
      res.json({ success: true })

    } catch (e) {
      res.status(500).json({ success: false })
    }
  }

  getLike = async (req: Request, res: Response) => {
    try {
      const likes = await this.courseService.getLike()
      res.json(likes); // respond to index.js file (const memos = await fetchRes.json();) 
      res.redirect('/')
    } catch (e) {
      console.log(e)
      res.status(500).json({ success: false })
    }
  }
}



