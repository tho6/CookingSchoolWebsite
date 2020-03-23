let videoHTML = []

  readVideos(1);  
  
  async function readVideos(con){
    alert(con)
    const fetchRes = await fetch('/videos')
    const videos = await fetchRes.json()
    document.querySelector('#videoPlayerDiv').innerHTML = '';
    document.querySelector('#videoPlayerDiv').innerHTML += `<video autoplay controls id="videoPlayer" src=""></video>`    
    document.querySelector('#videoList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
    
    for (let i = 0; i < videos.length; i++) {
      videoHTML = `<li class="listItem">`;
      videoHTML = videoHTML + videos[i].Dish + `<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>`;
      
      if (videos[i].Video != null) {
      videoHTML = `<li id="${videos[i].Video}" class="listItem flex-md-row list-group-item list-group-item-action">`
      videoHTML = videoHTML + videos[i].Dish + `<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button></li>`;
      }
      document.querySelector('#videoList').innerHTML += videoHTML; // add something into innerHTML      
    }
    //const videoPlayerHTML = `<source src="./`
    const listItems = document.querySelectorAll('#videoList .listItem');
    for(const listItem of listItems){
    listItem.addEventListener('click',(event)=>{
    
    if(con==1){
      document.querySelector('#videoPlayer').src = `./${event.currentTarget.id}`
    }else if(con==0){
      document.querySelector('#videoPlayer').src = ""
      
    }
    
    
})}


const trashes = document.querySelectorAll('.trash');
for(const trash of trashes){
trash.addEventListener('click', async (event)=>{

await fetch('/videos/' + event.currentTarget.dataset.id,{ //refer to line no. 15 & 18 data-id="${i}"
  method: 'DELETE' 
})

readVideos(0)
})}

con = 1
}
