// server site 
// post must be redirect, if no redirect , will go to localhost:8080/memos website
// 
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer' // auto change the photo filename and put photo file to upload folder
//import jsonfile from 'jsonfile'
//import expressSession from 'express-session';


//multer standard syntax
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.category}_${req.body.dish}_${Date.now()}.${file.mimetype.split('/')[1]}`); // category and dish refer to html form name tag
  }
})

export const upload = multer({ storage: storage })
// multer standard syntax


const app = express()

// 增強 express 的功能
// Middleware (未講)
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import {CourseService} from './Services/courseService'
import {CourseRouter} from './Routers/courseRouter'
const courseService = new CourseService()
const courseRouter = new CourseRouter(courseService)
 

// const API_VERSION = "/api/v1"
// app.use(`${API_VERSION}/testing`,videoRouter.router())
app.use(courseRouter.router())



// app.get('/courses', async(req,res)=>{
//     try{
//         const courses = await jsonfile.readFile('./courses.json')
//         res.json(courses)
//     }catch (e){
//         console.error(e)
//         res.status(500).json({success:false})
//     }    
// })

// app.post('/courses',upload.single('image'),async(req,res)=>{ // (image) must be match to html file <input type="file" name="image">
//     try{
//         if (req.body.Classroom == null || req.body.Classroom == ''){
//             res.status(400).json({success:false,message:"please type something on text box"})
//             return
//         }
        
//         const courses = await jsonfile.readFile('./courses.json')
//         courses.push({
//             Classroom: req.body.Classroom,
//             png: req.file == null ? null : req.file.filename // "png" is courses.json file (key Name)
       
//         })
//         await jsonfile.writeFile('./courses.json',courses)
//         res.redirect('/')
//     }catch(e){
//         console.error(e)
//         res.status(500).json({success:false})
//     }
// })


// app.delete('/courses/:id', async(req,res)=>{
//     try{
//         const courses = await jsonfile.readFile('./courses.json')
//         courses.splice(req.params.id ,1)
//         await jsonfile.writeFile('./courses.json',courses)
//         res.json({success:true})
        
//     }catch(e){
//         res.status(500).json({success:false})
//     }
        
// })


app.listen(8080, () => {
    console.log('Listening on port 8080')
})
  