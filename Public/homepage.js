const loggedIn = true;

function afterLogIn(){
    if (loggedIn){
        const loginbtn = document.querySelector('#login')
        loginbtn.innerHTML = '登出';
        const upload = `<li class="nav-item">
                            <a href="#" id="upload" class="nav-link btn btn-outline-light btn-lg">上傳</a>
                        </li>`
        loginbtn.parentNode.insertAdjacentHTML('beforebegin', upload)
    }
}

afterLogIn();