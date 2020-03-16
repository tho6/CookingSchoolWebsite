   //Browser site' 
   let courseHTML = []
   readCategories();
    // <ul id="courseList">
    //<li class="listItem"><img class="courseIcon" src="./${courses[i].png}"><a href="/Classroom1.html">${courses[i].Classroom}</a></li>
    //<li class="listItem"><a href="/Classroom1.html">${courses[i].Classroom}</a></li>
    //</ul>
          
async function readCategories(){
    const fetchRes = await fetch('/courses')
    const courses = await fetchRes.json()
    document.querySelector('#courseList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
    console.log(courses.length)
    for (let i = 0; i < courses.length; i++) {
      courseHTML = `<li class="listItem">`
      courseHTML = courseHTML + `<a href="/${Object.keys(courses[i])[0]}${courses.length}.html">` + courses[i].Classroom + `</a></li>`;
      if (courses[i].png != null) {
      courseHTML = `<li class="listItem"><img class="courseIcon" src="./${courses[i].png}">`
      courseHTML = courseHTML + `<a href="/${Object.keys(courses[i])[0]}${courses.length}.html">` + courses[i].Classroom + `</a></li>`;
      }
      document.querySelector('#courseList').innerHTML += courseHTML; // add something into innerHTML      
    }
    //const videoPlayerHTML = `<source src="./`
    //const listItems = document.querySelectorAll('#courseList .listItem');
    //for(const listItem of listItems){
    //listItem.addEventListener('click',(event)=>{
    //document.querySelector('#videoPlayer').innerHtml = `${videoPlayerHTML}${event.target.id}" type="video/mp4">${myStr}`
    //document.querySelector('#videoPlayer').src = `./${event.target.id}`
//})}

}
    document.querySelector('#addMessageForm').addEventListener('submit', async (event) => {
      const form = event.currentTarget // currentTarget only available on Form tag
      event.preventDefault()
      //if(document.querySelector('#addMessageForm textarea').value == ""){ // adopt innerHtml or Value depends on typing textBox or not 

      //}
      //if(document.querySelector('#addMessageForm textarea')
      const formData = new FormData(form)
      await fetch('/courses',{
        method: 'POST',
        body: formData
      })
      readCategories()
  })
