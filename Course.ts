//sever site

import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'
import jsonfile from 'jsonfile'

//multer standard syntax
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
    })
  
  const upload = multer({storage: storage})
  // multer standard syntax
  
  
  const app = express()

  // 增強 express 的功能
// Middleware (未講)
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/courses', async(req,res)=>{
    try{
        const courses = await jsonfile.readFile('./courses.json')
        res.json(courses)
    }catch (e){
        console.error(e)
        res.status(500).json({success:false})
    }    
})

app.post('/courses',upload.single('image'),async(req,res)=>{ // (image) must be match to html file <input type="file" name="image">
    try{
        const courses = await jsonfile.readFile('./courses.json')
        courses.push({
            Classroom: req.body.Classroom,
            png: req.file == null ? null : req.file.filename // "png" is courses.json file (key Name)
        })
        await jsonfile.writeFile('./courses.json',courses)
        res.redirect('/')
    }catch(e){
        console.error(e)
        res.status(500).json({success:false})
    }
})

app.listen(8080, () => {
    console.log('Listening on port 8080')
})
  