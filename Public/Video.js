   //let myStr = 'Your Browser does not support MP4 videos, please change browser!' 
   let videoHTML = []
   readVideos();
async function readVideos(){
    const fetchRes = await fetch('/videos')
    const videos = await fetchRes.json()
    document.querySelector('#videoList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
    
    for (let i = 0; i < videos.length; i++) {
      videoHTML = `<li class="listItem">`;
      videoHTML = videoHTML + videos[i].content + '</li>';
      if (videos[i].Video != null) {
      videoHTML = `<li id="${videos[i].Video}" class="listItem">`
      videoHTML = videoHTML + videos[i].content + '</li>';
      }
      document.querySelector('#videoList').innerHTML += videoHTML; // add something into innerHTML      
    }
    //const videoPlayerHTML = `<source src="./`
    const listItems = document.querySelectorAll('#videoList .listItem');
    for(const listItem of listItems){
    listItem.addEventListener('click',(event)=>{
    //document.querySelector('#videoPlayer').innerHtml = `${videoPlayerHTML}${event.target.id}" type="video/mp4">${myStr}`
    document.querySelector('#videoPlayer').src = `./${event.target.id}`
})}

}
    document.querySelector('#addMessageForm').addEventListener('submit', async (event) => {
      const form = event.currentTarget // currentTarget only available on Form tag
      event.preventDefault()
      //if(document.querySelector('#addMessageForm textarea').value == ""){ // adopt innerHtml or Value depends on typing textBox or not 

      //}
      //if(document.querySelector('#addMessageForm textarea')
      const formData = new FormData(form)
      await fetch('/videos',{
        method: 'POST',
        body: formData
      })
      readVideos()
  })
