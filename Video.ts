// server site 
// post must be redirect, if no redirect , will go to localhost:8080/memos website
// 
import express from 'express'
import path from 'path'





const app = express()
console.log(path.join(__filename, 'public','Video.js'))
console.log(path.join(__dirname, 'public'))
// 增強 express 的功能
// Middleware (未講)
app.use(/* 放加強器 */ express.static(path.join(__dirname, 'public')))




app.listen(8080, () => {
  console.log('Listening on port 8080')
})
