   //Browser site' 
   let courseHTML = []
   let likeNo
   readCategories();
    // <ul id="courseList">
    //<li class="listItem"><img class="courseIcon" src="./${courses[i].png}"><a href="/Classroom1.html">${courses[i].Classroom}</a></li>
    //<li class="listItem"><a href="/Classroom1.html">${courses[i].Classroom}</a></li>
    //</ul>
          
async function readCategories(){
    const fetchRes = await fetch('/courses')
    const courses = await fetchRes.json()
    
    document.querySelector('#courseList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
    for (let i = 0; i < courses.length; i++) {
      courseHTML = `<li class="listItem">`
      courseHTML = courseHTML + `<a href="/${Object.keys(courses[i])[0]}${i+1}.html">` + courses[i].Classroom + `</a><button class="like"><i id="like" class="fas fa-thumbs-up"></i></button>${likeNo}<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>`;
      if (courses[i].png != null) {
      courseHTML = `<li class="listItem"><img class="courseIcon" src="./${courses[i].png}">`
      courseHTML = courseHTML + `<a href="/${Object.keys(courses[i])[0]}${i+1}.html">` + courses[i].Classroom + `</a><button class="like"><i id="like" class="fas fa-thumbs-up"></i></button>${likeNo}<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>`;
      }
      document.querySelector('#courseList').innerHTML += courseHTML; // add something into innerHTML      
    }
    const trashes = document.querySelectorAll('.trash');
    for(const trash of trashes){
    trash.addEventListener('click', async (event)=>{
    await fetch('/courses/' + event.target.dataset.id,{ //refer to line no. 15 & 18 data-id="${i}"
      method: 'DELETE' 
    })
    readCategories()
  })}
    
  

}


  document.querySelector('#addMessageForm').addEventListener('submit', async (event) => {
      const form = event.currentTarget // event.currentTarget = event.target
      event.preventDefault()
      if(document.querySelector('#addMessageForm textarea').value == ""){ // adopt innerHtml or Value depends on typing textBox or not 
        alert("please type something on text Box")
        return
      }
      //if(document.querySelector('#addMessageForm textarea')
      const formData = new FormData(form)
      form.reset()
      await fetch('/courses',{
        method: 'POST',
        body: formData
      })
      readCategories()
  })


  
  // readLikes()
  // async function readLikes(){
  //   const fetchRes2 = await fetch('/likes')
  //   const likeObj = await fetchRes2.json()
    
  //   const likes = document.querySelectorAll('.like');
  //   for(const like of likes){
  //   like.addEventListener('click', async (event)=>{
  //   alert(likeObj.likeKey)
  //   readCategories()
  // })}
//}