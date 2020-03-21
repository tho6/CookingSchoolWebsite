import path from 'path'
import jsonfile from 'jsonfile'

export class CourseService{
    protected coursesJsonPath:string
    protected likesJsonPath:string
    protected counter:number = 0
    public constructor(){
        this.coursesJsonPath = path.join(__dirname, "../courses.json")
        this.likesJsonPath = path.join(__dirname, "../likes.json")
    }

    public async getCourses(){
        const courses = await jsonfile.readFile(this.coursesJsonPath); //from json file get something
        return courses
    }
    
    public async postCourse(Classroom:string,file:Express.Multer.File){
        const courses = await jsonfile.readFile(this.coursesJsonPath)
        courses.push({
            Classroom: Classroom,
            png: file == null ? null : file.filename // "png" is courses.json file (key Name)
        })
            await jsonfile.writeFile(this.coursesJsonPath, courses)
            
            return courses
    }

    public async removeCourse(id:number){
        const courses = await jsonfile.readFile(this.coursesJsonPath)
            console.log(courses[id])
            courses.splice(id, 1)
            await jsonfile.writeFile(this.coursesJsonPath, courses)
            return courses
        }

    public async getLike(){
        this.counter = this.counter + 1
        const likes = await jsonfile.readFile(this.likesJsonPath)
        likes[0].num = this.counter 
            
        console.log(likes[0])
            await jsonfile.writeFile(this.likesJsonPath, likes)
            return likes
    }
    
        
}



