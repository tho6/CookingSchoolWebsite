   //let myStr = 'Your Browser does not support MP4 videos, please change browser!' 
   let videoHTML = []
   readVideos();
async function readVideos(){
    const fetchRes = await fetch('/videos')
    const videos = await fetchRes.json()
    document.querySelector('uploadVideo.html #videoList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
    
    for (let i = 0; i < videos.length; i++) {
      videoHTML = `<li class="listItem"><button>`;
      videoHTML = videoHTML + videos[i].Dish + '<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>';
      if (videos[i].Video != null) {
      videoHTML = `<li id="${videos[i].Video}" class="listItem">`
      videoHTML = videoHTML + videos[i].Dish + '<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>';
      }
      document.querySelector('#videoList').innerHTML += videoHTML; // add something into innerHTML      
    }
    //const videoPlayerHTML = `<source src="./`
    const listItems = document.querySelectorAll('#videoList .listItem');
    for(const listItem of listItems){
    listItem.addEventListener('click',(event)=>{
    //document.querySelector('#videoPlayer').innerHtml = `${videoPlayerHTML}${event.target.id}" type="video/mp4">${myStr}`
    document.querySelector('#videoPlayer').src = `./${event.currentTarget.id}`
    
})}


const trashes = document.querySelectorAll('.trash');
for(const trash of trashes){
trash.addEventListener('click', async (event)=>{
await fetch('/videos/' + event.target.dataset.id,{ //refer to line no. 15 & 18 data-id="${i}"
  method: 'DELETE' 
})
readVideos()
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
      await fetch('/videos',{
        method: 'POST',
        body: formData
      })
      readVideos()
  })
