import path from 'path'
import jsonfile from 'jsonfile'
import fs from 'fs'
export class VideoService {
  protected videosJsonPath: string

  public constructor() {
    this.videosJsonPath = path.join(__dirname, "../videos.json")
  }

  public async getVideos() {
    const videos = await jsonfile.readFile(this.videosJsonPath); //from json file get something
    return videos
  }

  public async postVideo(category: string, dish: string, file: Express.Multer.File) {
    const videos = await this.getVideos()
    videos.push({
      Category: category,
      Dish: dish,
      Video: file == null ? null : file.filename // "Video" is Video.json file (key Name)
    })
    await fs.writeFile(`./commentsJson/${category}_${dish}_comment.json`, `{
                "nextid": 0,
                "comments": []
            }`, function (err) {
      if (err) throw err;
      console.log('file is created')
    })

    await fs.writeFile(`./Private/${category}_${dish}.html`, `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${category}_${dish}</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://cdn.bootcss.com/font-awesome/5.12.1/css/all.css" rel="stylesheet">
    <link href="/Classroom1.css" rel="stylesheet">
    <link href="/favicon.ico" rel="shortcut icon">
  </head>
  
  <body>
  
    <div>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a href="/" class="navbar-brand"><img src="homeImg/brand2.png" alt=""></a>
        <div class="category-title">
          <h5>${category}</h5>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="/" class="nav-link">首頁</a>
            </li>
            <li class="nav-item dropdown">
                            <a href="#" data-toggle="dropdown" id="navbarDropdownMenuLink" class="nav-link dropdown-toggle">菜式</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="中式_瑤柱蛋白炒飯.html">中式</a>
                                <a class="dropdown-item" href="意大利菜_五彩蔬菜千層麵.html">意大利菜</a>
                                <a class="dropdown-item" href="法國菜_白酒忌廉煮青口.html">法國菜</a>
                                <a class="dropdown-item" href="印度菜_印度咖哩雞.html">印度菜</a>
                                <a class="dropdown-item" href="泰國菜_泰式冬蔭功海鮮湯.html">泰國菜</a>
                                <a class="dropdown-item" href="越南菜_扎肉鷄絲凍檬.html">越南菜</a>
                                <a class="dropdown-item" href="日本菜_日式炒烏冬.html">日本菜</a>
                                <a class="dropdown-item" href="韓國料理_韓式香辣炸雞腿.html">韓國料理</a>
                
                            </div>
                        </li>
  
            <li class="nav-item">
              <a href="/#contact" class="nav-link">聯絡我們</a>
            </li>
            <li class="nav-item">
              <a href="login.html" id="login" class="nav-link btn btn-outline-light btn-lg">登入</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  
  
  
    <div class="container-fluid">
      <div class="row" id="video-row">
        <div class="col-md-8" id="videoPlayerDiv">
  
  
  
        </div>
        <div class="col-md-4 d-flex listV">
          <ul id="videoList">
          </ul>
        </div>
      </div>
      <div class="row leave-comments">
        <textarea id="comment-area" placeholder="留言吧 📣👅"></textarea>
        <div class="post-comment-btn">
          <button type="button" class="btn btn-primary" id="post-comment-btn">留言</button>
        </div>
      </div>
  
      <div class="row comments">
  
      </div>
  
    </div>
  
  
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"></script>
    <script src="/Video.js"></script>
    <script src="/Message.js" charset="UTF-8"></script>
  </body>
  
  </html>`, function (err) {
      if (err) throw err;
      console.log('file is created')
    })

    await jsonfile.writeFile(this.videosJsonPath, videos)

    return videos
  }

  public async removeVideo(id: number) {
    const videos = await jsonfile.readFile(this.videosJsonPath)
    videos.splice(id, 1)
    await jsonfile.writeFile(this.videosJsonPath, videos)
    return videos
  }

}
