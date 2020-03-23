import express from 'express'
import {Request, Response} from 'express'
import {VideoService} from '../Services/videoService'
//import {upload} from '../main'
//import {Multer} from 'multer'
export class VideoRouter{
    
    constructor(private videoService:VideoService,private upload:any){

    }

    router(){
        const router = express.Router()
        router.get('/videos',this.getVideos)
        router.post('/videos', this.upload.single('video'),this.postVideo)
        router.delete('/videos/:id',this.removeVideo)
        return router
    }
    getVideos = async (req:Request,res:Response) => {
        try {
            const videos = await this.videoService.getVideos()
            res.json(videos); // respond to index.js file (const memos = await fetchRes.json();) 
          } catch (e) {
            console.error(e);
            res.status(500).json({ success: false })
          }
    }
    postVideo = async (req:Request,res:Response)=> {
        try {
            if (req.body.category == null || req.body.category == '') {
              res.status(400).json({ success: false, message: "please type something on text box" })
              return
            }
            await this.videoService.postVideo(req.body.category,req.body.dish,req.file)
            console.log(req.session)
            res.json({ success: true })
        
          } catch (e) {
            console.log(e)
            res.status(500).json({ success: false })
          }
    }

    removeVideo = async (req:Request,res:Response)=> {
      try {
        const { id } = req.params
        const idNum = parseInt(id)
        if(isNaN(idNum)){
          res.status(400).json({success:false})
          return
        }
        await this.videoService.removeVideo(idNum)
        res.json({ success: true })
        
      } catch (e) {
        res.status(500).json({ success: false })
      }
    }
    
 }

