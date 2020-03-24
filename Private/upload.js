// import fs from 'fs'
document.querySelector('#addMessageForm').addEventListener('submit', async (event) => {
  const form = event.currentTarget // event.currentTarget = event.target
  event.preventDefault()
  if (document.querySelector('#addMessageForm textarea').value == "") { // adopt innerHtml or Value depends on typing textBox or not 
    alert("please type something on text Box")
    return
  }
  function GetDishInnerHTML(){
    var e = document.getElementById("dish");
    var dish = e.value;
  
  }
  GetDishInnerHTML()
  function GetSelectedText(){
    var e = document.getElementById("category");
    var category = e.options[e.selectedIndex].text;
    
  }
  GetSelectedText()
  
//   alert(dish)  
//   alert(category)  
//    await fs.appendFile(`./${category}_${dish}_comment.json`, `{
//     "nextid": 0,
//     "comments": []
// }`, function (err) {
//     if (err) throw err;
//     console.log('file is created')
//   })

//   await fs.appendFile(`./${category}_${dish}.html`, `<!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Classroom1</title>
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//     integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
//   <link href="https://cdn.bootcss.com/font-awesome/5.12.1/css/all.css" rel="stylesheet">
//   <link href="../Classroom1.css" rel="stylesheet">
//   <link href="favicon.ico" rel="shortcut icon">
// </head>

// <body>
  
//   <div>
//     <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
//       <a href="/" class="navbar-brand"><img src="homeImg/brand2.png" alt=""></a>
//       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
//         <span class="navbar-toggler-icon"></span>
//       </button>

//       <div class="collapse navbar-collapse" id="navbarResponsive">
//         <ul class="navbar-nav ml-auto">
//           <li class="nav-item">
//             <a href="/" class="nav-link">首頁</a>
//           </li>
//           <li class="nav-item">
//             <a href="/#categories" class="nav-link">菜式</a>
//           </li>

//           <li class="nav-item">
//             <a href="/#contact" class="nav-link">聯絡我們</a>
//           </li>
//           <li class="nav-item">
//             <a href="login.html" id="login" class="nav-link btn btn-outline-light btn-lg">登入</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   </div>

//   <!-- <a href="/upload.html">下昌</a> -->

//   <div class="container-fluid">
//     <div class="row" id="video-row">
//       <div class="col-md-8">
//         <video autoplay controls id="videoPlayer">
//         </video>
        

//       </div>
//       <div class="col-md-4 d-flex listV">
//         <ul id="videoList">
//         </ul>
//       </div>
//     </div>
//   <!-- </div> -->


//   <!-- <div class="container" id='comment'> -->
//     <!-- <div class="row">
//         <div class="col-lg-12"> -->
//     <div class="row leave-comments">
//       <textarea id="comment-area" placeholder="留言吧 📣👅"></textarea>
//       <div class="post-comment-btn">
//         <button type="button" class="btn btn-primary" id="post-comment-btn">留言</button>
//       </div>
//     </div>

//     <div class="row comments">

//     </div>

//     <!-- </div> -->

//     <!-- </div> -->
//   </div>

  
//   <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
//     integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
//     crossorigin="anonymous"></script>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
//     integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
//     crossorigin="anonymous"></script>
//   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
//     integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
//     crossorigin="anonymous"></script>

//   <script src="../Video.js"></script>
//   <script src="../message.js" charset="UTF-8"></script>
// </body>

// </html>`, function (err) {
//     if (err) throw err;
//     console.log('file is created')
//   })


  const formData = new FormData(form)
  form.reset()
  await fetch(`/${category}/${dish}`, {
    method: 'POST',
    body: formData
  })
  

})
