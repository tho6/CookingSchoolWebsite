
currentPath = decodeURIComponent(window.location.href)
// alert(currentPath)
currentPath = currentPath.split('.')[0];
currentPath = currentPath.split('/')[3];
const categoryURL = currentPath.split('_')[0]
const dishURL = currentPath.split('_')[1]
// alert(categoryURL)
// alert(dishURL);
let videoHTML = []
readVideos(1)

async function readVideos(con) {

  const fetchRes = await fetch('/videos')
  const videos = await fetchRes.json()

  // document.querySelector('#videoPlayerDiv').innerHTML = '';
  if(con > 0){
    document.querySelector('#videoPlayerDiv').innerHTML += `<video autoplay controls id="videoPlayer" src="./${categoryURL}_${dishURL}.mp4"></video>`
  }
  document.querySelector('#videoList').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
  // alert(videos[0].Category)
  for (let i = 0; i < videos.length; i++) {
    //  alert(videos[0].Category)
    if (videos[i].Category == categoryURL && videos[i].Dish == dishURL) {
      videoHTML = `<li id="${videos[i].Video}" class="active listItem flex-md-row list-group-item list-group-item-action"><a href="${videos[i].Category}_${videos[i].Dish}.html">${videos[i].Dish}</a>`
      if (isAdmin) {
      videoHTML = videoHTML + `<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button>`;
      }
      videoHTML = videoHTML + `</li>`
      document.querySelector('#videoList').innerHTML += videoHTML; // add something into innerHTML      
      
    } else if (videos[i].Category == categoryURL) {
      videoHTML = `<li id="${videos[i].Video}" class="listItem flex-md-row list-group-item list-group-item-action"><a href="${videos[i].Category}_${videos[i].Dish}.html">${videos[i].Dish}</a>`
      if (isAdmin) {
      videoHTML = videoHTML + `<button class="trash" data-id="${i}"><i class="fas fa-trash"></i></button>`;
      }
      videoHTML = videoHTML + `</li>`
      document.querySelector('#videoList').innerHTML += videoHTML; // add something into innerHTML      
      
    }

  }
  let titleVideo = '';
  titleVideo += `<div class="video-title"><h5><strong>${dish}</strong></h5></div>
                  <hr class=horizontal-line></hr>`
  document.querySelector('#videoPlayer').insertAdjacentHTML('afterend', titleVideo)
  


  // const listItems = document.querySelectorAll('#videoList .listItem');
  // for (const listItem of listItems) {
  //   listItem.addEventListener('click', (event) => {

  //     if (con == 1) {
  //       document.querySelector('#videoPlayer').src = `./${event.currentTarget.id}`
  //     } else if (con == 0) {
  //       document.querySelector('#videoPlayer').src = ""

  //     }


  //   })
  // }


  const trashes = document.querySelectorAll('.trash');
  for (const trash of trashes) {
    trash.addEventListener('click', async (event) => {

      await fetch('/videos/' + event.currentTarget.dataset.id, { //refer to line no. 15 & 18 data-id="${i}"
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      },
        body:JSON.stringify({category:categoryURL, dish: dishURL}
      )})
      window.location.href = "http://localhost:8080";

      // readVideos(0)
    })
  }

}

