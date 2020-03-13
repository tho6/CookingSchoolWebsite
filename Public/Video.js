videoSelect()
function videoSelect(){
    const vidPlayer = document.querySelector('source') 
    const listItems = document.querySelectorAll('#videoList .listItem');
for(const listItem of listItems){
    listItem.addEventListener('click', function(event){
    alert(event.target.id)
    vidPlayer.setAttribute("src",event.target.id)
    })
}
}