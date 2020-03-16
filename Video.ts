// server site 
// post must be redirect, if no redirect , will go to localhost:8080/memos website
// 
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer' // auto change the photo filename and put photo file to upload folder
import jsonfile from 'jsonfile'
//import expressSession from 'express-session';


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


app.get('/videos', async (req, res) => {
  try {
    const videos = await jsonfile.readFile('./videos.json'); //from json file get something
    res.json(videos); // respond to index.js file (const memos = await fetchRes.json();) 
  } catch (e) {
    console.error(e);
    res.status(500).json({success: false})
  }
})


app.post('/videos',upload.single('video'), async (req,res)=>{
  try{
    const videos = await jsonfile.readFile('./videos.json'); //from json file get something
    videos.push({
      content: req.body.content,
      Video: req.file == null ? null : req.file.filename // "Video" is Video.json file (key Name)
    })
    await jsonfile.writeFile('./videos.json',videos)
    res.redirect('/Classroom.html')
  
  } catch (e){
    console.log(e)
    res.status(500).json({success:false})
  }
})
  
app.get('/play', async (req, res) => {
  try {
    const play = await jsonfile.readFile('./play.json'); //from json file get something
    res.json(play); // respond to index.js file (const memos = await fetchRes.json();) 
  } catch (e) {
    console.error(e);
    res.status(500).json({success: false})
  }
})


app.post('/play', async (req,res)=>{
  try{
    const play = await jsonfile.readFile('./play.json'); //from json file get something
    play.push({
      content: req.body.content,
    })
    await jsonfile.writeFile('./play.json',play)
    res.redirect('/Classroom.html')
  
  } catch (e){
    console.log(e)
    res.status(500).json({success:false})
  }
})


app.listen(8080, () => {
  console.log('Listening on port 8080')
})
