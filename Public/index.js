let loggedIn = false;
let isAdmin = false;

async function getCurrentUser() {
    const resFetch = await fetch('/users/getCurrentUser')
    const jsonRes = await resFetch.json();
    console.log('ooooooo')
    console.log(jsonRes)
    if (jsonRes.username) {
        loggedIn = true
        console.log(loggedIn)
        if (jsonRes.isAdmin == true){
            isAdmin = true;
        }
    } else {
        loggedIn = false
        console.log(loggedIn)
    }
//     // below try admin
//   if (result.role === 'admin') {
//     isAdmin = true;
//     // removeVideo();
//   }
}
$(function(){
    $('.dropdown-menu').hover(function() {
        $(this).addClass('show');
    },
    function() {
        $(this).removeClass('show');
    });
});

// // below try admin
// let isAdmin = false;

// const result = await resFetch.json();
// if (result.success) {
//   isAdmin = true;
//   removeVideo();
// } else {
//   alert('Admin only');
// }
// above try admin

// const jsonRes = getCurrentUser();

// console.log(jsonRes)

function afterLogIn(){
    if (loggedIn){
        const loginbtn = document.querySelector('#login')
        loginbtn.setAttribute('href','');
        loginbtn.addEventListener('click', async function() { await fetch('/users/logout') }, {once: true});
        loginbtn.innerHTML = '登出';
        if (isAdmin){
            const upload = `<li class="nav-item">
            <a href="upload.html" id="upload" class="nav-link btn btn-outline-light btn-lg">上傳</a>
        </li>`
        loginbtn.parentNode.insertAdjacentHTML('beforebegin', upload)
        }
        
        console.log('work')
    }
}

// function redirCategories{
    
// }





//
async function main(){
    await getCurrentUser()

    afterLogIn();
}

main();
