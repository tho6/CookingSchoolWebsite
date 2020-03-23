import path from 'path'
import jsonfile from 'jsonfile'
// import fs from 'fs'
export class VideoService{
    protected videosJsonPath:string
    
    public constructor(){
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
            //console.log(33)

            // await fs.appendFile(`./Private/htmls/${category}_${dish}.html`,'hi',function(err){
            //     if (err) throw err;
            //     //console.log('file is created')
            // })
            //console.log(33)
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
