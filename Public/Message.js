// let currentPath = "localhost:8080/api/v1/comment/hi/bye"
currentPath = window.location.href
console.log(currentPath)
currentPath = currentPath.split('.')[0];
currentPath = currentPath.split('/');
// currentPath = currentPath.splice(currentPath.indexOf('comment') + 1);
currentPath = currentPath.splice(-2);

console.log(currentPath);
const category = decodeURIComponent(currentPath[0])
const dish = decodeURIComponent(currentPath[1])
console.log(category, dish);
let username = '';
let firstTime = true;

let loggedIn = false;

async function getCurrentUser() {
    const resFetch = await fetch('/users/getCurrentUser')
    const jsonRes = await resFetch.json();
    console.log('ooooooo')
    console.log(jsonRes)
    if (jsonRes.username) {
        username = jsonRes.username.split('@')[0]
        loggedIn = true
        console.log(firstTime)
        console.log(loggedIn)
    } else {
        loggedIn = false
        console.log(loggedIn)
    }

}

// const jsonRes = getCurrentUser();

// console.log(jsonRes)
$(function(){
    $('.dropdown-menu').hover(function() {
        $(this).addClass('show');
    },
    function() {
        $(this).removeClass('show');
    });
});

function afterLogIn() {
    if (loggedIn) {
        firstTime = false;
        const loginbtn = document.querySelector('#login')
        loginbtn.setAttribute('href', '');
        loginbtn.addEventListener('click', async function () { await fetch('/users/logout') }, { once: true });
        loginbtn.innerHTML = '登出';
        const upload = `<li class="nav-item">
                            <a href="upload.html" id="upload" class="nav-link btn btn-outline-light btn-lg">上傳</a>
                        </li>`
        loginbtn.parentNode.insertAdjacentHTML('beforebegin', upload)
    }
}


// function afterLogIn(){
//     if (loggedIn){
//         const loginbtn = document.querySelector('#login')
//         loginbtn.innerHTML = '登出';
//         const upload = `<li class="nav-item">
//                             <a href="#" id="upload" class="nav-link btn btn-outline-light btn-lg">上傳</a>
//                         </li>`
//         loginbtn.parentNode.insertAdjacentHTML('beforebegin', upload)
//     }
// }

function findReferring(comments, tempComment) {
    const allReferring = [];

    for (const idx of tempComment.referring) {
        let commentIndex = comments.findIndex((comment) => (comment.id == idx));
        // console.log(commentIndex)
        if (commentIndex !== -1) {
            // console.log('hi')
            allReferring.push(comments[commentIndex]);
            continue;
        }

        for (const comment in comments) {
            const replies = comments[comment].replies
            if (replies.length !== 0) {
                // console.log(replies)
                // console.log(replies.length)
                commentIndex = replies.findIndex((comment) => (comment.id == idx));
                // console.log(commentIndex)
                if (commentIndex >= 0) {
                    // console.log(commentIndex)
                    allReferring.push(comments[comment].replies[commentIndex]);
                }
            }
        }
    }
    return allReferring;
}

async function readComment(id = null) {

    const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`);
    let comments = await fetchRes.json();
    comments = comments.comments;
    // console.log(comments)

    document.querySelector(".comments").innerHTML = '';
    const headComments = comments.filter(function (item, index, array) {
        return item.referring.length === 0
    })
    // console.log(headComments)
    for (let i = 0; i < headComments.length; i++) {
        // let commentHTML = '<div class = "comment-section">';
        if (i == 0) {
            let commentBtnHTML = document.querySelector('.post-comment-btn')
            // console.log(commentBtnHTML);
            commentBtnHTML.innerHTML = '';
            commentBtnHTML.innerHTML = '<button type="button" class="btn btn-primary" id="post-comment-btn">留言</button>';
        }
        const comment = headComments[i];
        // console.log(comment)
        let commentHTML =
            `<div class = "comment-section" data-username='${comment.username}'>
                    <div class="comment">${comment.comment}</div>
                    <div class="comment-footer">`
        if (comment.edited==true){
            commentHTML +=   `<div class="edited d-inline-block">(edited)</div>`
        }
        if (comment.replies.length == 1) {
            commentHTML += `<button class="btn show-btn d-inline-block" data-id=${comment.id}>顯示回應
                                <i class="fas fa-caret-down"></i>
                            </button>`
        } else if (comment.replies.length > 1) {
            commentHTML += `<button class="btn show-btn d-inline-block" data-id=${comment.id}>顯示回應
                                <i class="fas fa-caret-down"></i>
                            </button>`
        }

        if (comment.userIcon != null) {
            commentHTML += `<img src="${comment.userIcon}"</img>`
        }

        commentHTML += `<div class="username d-inline-block">${comment.username}</div>
                        <div class="edit-time d-inline-block">${comment.editTime}</div>
                        <button class="btn reply-btn hide"  data-outerreply = 'true' data-username='${comment.username}' data-id=${comment.id}>
                            <i class="fas fa-reply"></i>
                        </button>
                        <button class="btn edit-btn hide" data-outerEdit = 'true' data-username='${comment.username}' data-id=${comment.id}>
                            <i class="fas fa-pencil-alt "></i>
                        </button>
                        <button class="btn trash-btn hide" data-outerTrash = 'true' data-username='${comment.username}' data-id=${comment.id}>
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`

        for (let j = 0; j < comment.replies.length; j++) {
            // let tempComment = comments.find((tempcomment)=>(tempcomment.id==comment.replies[j]))
            let tempComment = comment.replies[j];
            const allReferring = findReferring(comments, tempComment);
            commentHTML +=
                // <div class="hide" data-use="hiding" data-id=${i} data-open="false"></div>
                `
                <div class = "replies-section hide" data-username='${comment.username}' data-use="hiding" data-display='false' data-id=${comment.id} data-open="false">`
            for (let k = 0; k < allReferring.length; k++) {
                let totalIndentation = allReferring.length * 10 - k * 10;
                let edited = ''
                if (allReferring[k].edited==true){
                    edited = '(edited) '; 
                }
                commentHTML +=
                    `<div class="referring-comment" style="padding-left:${totalIndentation}px">${edited}${allReferring[k].comment}</div>`
            }
            commentHTML +=
                `<div class="comment">${tempComment.comment}</div>
                        <div class="comment-footer">`
            if (tempComment.edited==true){
                commentHTML +=   `<div class="edited d-inline-block">(edited)</div>`
            }
            if (tempComment.userIcon != null) {
                commentHTML += `<img src="${tempComment.userIcon}"</img>`
            }
            commentHTML +=
                `<div class="username d-inline-block">${tempComment.username}</div>
                        <div class="edit-time d-inline-block">${tempComment.editTime}</div>
                        <button class="btn reply-btn hide" data-outerreply ='false' data-username='${tempComment.username}' data-id=${tempComment.id}>
                            <i class="fas fa-reply"></i>
                        </button>
                        <button class="btn edit-btn hide" data-innerEdit = 'true' data-username='${tempComment.username}' data-id=${tempComment.id}>
                            <i class="fas fa-pencil-alt "></i>
                        </button>
                        <button class="btn trash-btn reply-trash-btn hide" data-innerTrash = 'true' data-username='${tempComment.username}' data-id=${tempComment.id}>
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                `
        }
        document.querySelector(".comments").innerHTML += commentHTML;

    }
}

async function editComment() {
    const edits = document.querySelectorAll(".edit-btn")
    // console.log(edits)
    for (const edit of edits) {
        // console.log(edit)
        edit.addEventListener('click', (event) => {
            const editBtn = event.currentTarget;
            const commentDiv = editBtn.parentNode.parentNode.querySelector(".comment")
            const comment = commentDiv.innerHTML;
            commentDiv.innerHTML = `<textarea id="form24" class="md-textarea form-control text-area" rows="3">${comment}</textarea>`
            commentDiv.querySelector("textarea").focus();
            // document.getElementById(btn.id).disabled = true;
            commentDiv.querySelector("textarea").addEventListener('blur', async (event) => {
                const newValue = commentDiv.querySelector('textarea').value;
                // console.log(editBtn.dataset.id)
                if (comment != newValue) {
                    commentDiv.innerHTML = newValue;
                    if (editBtn.getAttribute('data-innerEdit')) {
                        console.log('inner')
                        const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderID: editBtn.dataset.id,
                                // outerID: editBtn.dataset.outerid,
                                content: {
                                    comment: newValue
                                }
                            })
                        })
                        let result = await fetchRes.json();
                        alert(await result.message);

                    } else {
                        // console.log(outer)
                        const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderID: editBtn.dataset.id,
                                content: { comment: newValue }
                            })
                        })
                        let result = await fetchRes.json();
                        alert(await result.message);


                    }

                }
                main(editBtn.parentNode.parentNode.dataset.id);
            })
        })
    }
}

async function deleteComment() {
    const trashes = document.querySelectorAll("[data-outerTrash = 'true']");
    for (let trash of trashes) {
        trash.addEventListener('click', async (event) => {
            const trashBtn = event.currentTarget;
            const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderID: `${trashBtn.dataset.id}`,
                    replyTrash: false
                })
            })
            let result = await fetchRes.json();
            alert(await result.message);
            main();
        })
    }

    const replyTrashes = document.querySelectorAll("[data-innerTrash = 'true']");
    for (let replyTrash of replyTrashes) {
        replyTrash.addEventListener('click', async (event) => {
            const trashBtn = event.currentTarget;
            await fetch(`/api/v1/comment/${category}/${dish}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderID: `${trashBtn.dataset.id}`,
                    // outerID: `${trashBtn.dataset.outerid}`,
                    replyTrash: true
                })
            })
            main(trashBtn.parentNode.parentNode.dataset.id);
        })
    }

}

async function postComment() {
    const postComment = document.querySelector('#post-comment-btn');
    const postCommentFunc = async function (event) {
        const postCommentBtn = event.currentTarget;
        const commentArea = document.querySelector('#comment-area');
        postComment.removeEventListener('click', postCommentFunc);

        // console.log(commentArea)
        // console.log(commentArea.value);
        // if (commentArea.value == '') {
        //     alert('The Comment is empty')

        // }else{
        const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: {
                    comment: commentArea.value
                }
            })
        })

        let result = await fetchRes.json();
        alert(await result.message);

        commentArea.value = '';
        main();
        // }
    }

    postComment.addEventListener('click', postCommentFunc)
}

async function replyComment() {
    const replies = document.querySelectorAll('.reply-btn');
    console.log(replies)
    for (let i = 0; i < replies.length; i++) {
        replies[i].addEventListener('click', (event) => {
            const replyBtn = event.currentTarget;
            console.log(replyBtn)
            let replyHTML = '';
            let outerreply = replyBtn.getAttribute('data-outerreply') == 'true'

            replyHTML =

                ` <div class = "comment-section replies-section" data-id=${i}>
                        <div class="comment"><textarea class="reply-area" data-id=${i} data-outerreply='${outerreply}' placeholder="留言吧 📣👅"></textarea></div>
                        <div class="comment-footer">`
            // if (comment.userIcon != null) {
            //     commentHTML += `<img src="${comment.userIcon}"</img>`
            // }
            replyHTML += `<div class="username d-inline-block">IvanReply</div>
                            <div class="edit-time d-inline-block">2020:2020:2020</div>
                            <button class="btn trash-btn d-inline-block" data-id=${i}>
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>`
            let insertLoc = '';
            let replyAreaTemp = '';
            insertLoc = document.querySelector(`.reply-btn[data-id='${replyBtn.dataset.id}'][data-outerreply='${outerreply}']`).parentNode.parentNode;
            insertLoc.insertAdjacentHTML('afterend', replyHTML);

            replyAreaTemp = insertLoc.parentNode.querySelector('.reply-area');
            replyAreaTemp.focus();

            // console.log(insertLoc.parentNode.querySelector(`.reply-area[data-id='${replyBtn.dataset.id}']`))

            replyAreaTemp.addEventListener('blur', async (event) => {
                const replyArea = event.currentTarget;
                if (replyArea.value == '') {
                    // console.log(document.querySelector(`.reply-section[data-id='${i}'][data-outerreply='${outerreply}']`))
                } else {
                    console.log('hhhhhh')
                    console.log(replyBtn)
                    // console.log(replyBtn.dataset.outerid, replyBtn.dataset.id)
                    const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            content: {
                                // outerID: replyBtn.dataset.outerid,
                                username: "Ivan",
                                userIcon: "Hi.jpg",
                                comment: replyArea.value,
                                orderID: replyBtn.dataset.id
                            }
                        })
                    })

                    let result = await fetchRes.json();
                    alert(await result.message);

                    replyArea.value = '';
                }
                // console.log(replyBtn.parentNode.parentNode)
                if (replyBtn.parentNode.parentNode.classList.contains('replies-section')) {
                    // if (replyBtn.dataset.outerid){
                    //     main(replyBtn.dataset.outerid);
                    // }else{
                    // replyBtn.parentNode.parentNode.setAttribute('data-display','true')
                    console.log(replyBtn.parentNode.parentNode)
                    console.log("WOWOW")
                    main(replyBtn.parentNode.parentNode.dataset.id);
                    // }
                } else {
                    main();
                }

            })
            console.log('hi')


            // for (const k = 0; k < comment.replies.length; k++){
            //     commentHTML += 
            // }
            // console.log(comment);
            // document.querySelector(".comments").innerHTML += commentHTML;
        }, { once: true })
    }
}

function showMore() {
    const shows = document.querySelectorAll('.show-btn');
    for (const show of shows) {
        show.addEventListener('click', (event) => {
            const showBtn = event.currentTarget;
            // console.log('working');
            // console.log(showBtn.classList);
            const hides = document.querySelectorAll(`[data-use=hiding][data-id='${showBtn.dataset.id}'`)
            // console.log(hides)
            for (let hide of hides) {
                if (hide.classList.contains('hide')) {
                    hide.classList.remove('hide');
                    // hide.classList.remove('show');
                } else {
                    hide.classList.add('hide');
                    // hide.classList.add('show');
                }
            }
        })
    }
}

function showBtns() {
    const sections = document.querySelectorAll(`.replies-section[data-username='${username}'],.comment-section[data-username='${username}']`)
    for (const section of sections) {
        section.addEventListener('mouseover', (event) => {
            const area = event.currentTarget;
            const btns = area.querySelectorAll('.reply-btn, .edit-btn, .trash-btn');
            for (const btn of btns) {
                btn.classList.add('d-inline-block')
            }
        }
        )
        section.addEventListener('mouseout', (event) => {
            const area = event.currentTarget;
            const btns = area.querySelectorAll('.reply-btn, .edit-btn, .trash-btn');
            for (const btn of btns) {
                btn.classList.remove('d-inline-block')
            }
        })
    }
}

function showExisting(id) {
    console.log(id)
    const all = document.querySelectorAll(`[data-use="hiding"][data-id="${id}"]`);
    console.log(all)
    for (const one of all) {
        one.classList.remove('hide');
    }
}

async function main(id) {
    await getCurrentUser();
    if (firstTime){
        afterLogIn();
    }
    await readComment();
    editComment();
    postComment();
    deleteComment();
    replyComment();
    showMore();
    showBtns();
    showExisting(id);
}

main();

window.onload = function () {
    //
}
