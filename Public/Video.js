//readVideo()
//async function readVideo(){
  //  const vidPlayer = document.querySelector('source') 
  //  const listItems = document.querySelectorAll('#videoList .listItem');
//for(const listItem of listItems){
  //  listItem.addEventListener('click', async(event)=>{
  //  await vidPlayer.setAttribute("src",event.currentTarget.id)
  //  })
//}
//}
    //<video autoplay controls id="video1">
    //<source src="./skype2282.mp4" type="video/mp4">
    //Your Browser does not support MP4 videos, please change browser!
    //</video>  
  
async function readVideo(){
    const fetchRes = await fetch('/videos')
    const videos = await fetchRes.json()
    //document.querySelector('.memos').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 

}