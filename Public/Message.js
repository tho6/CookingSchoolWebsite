let currentPath = "localhost:8080/api/v1/comment/no/way"
currentPath = currentPath.split('.')[0];
currentPath = currentPath.split('/');
currentPath = currentPath.splice(currentPath.indexOf('comment') + 1);
const category = currentPath[0];
const dish = currentPath[1];
console.log(category, dish);


async function readComment() {

    const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`);
    const comments = await fetchRes.json();
    // console.log(comments)

    document.querySelector(".comments").innerHTML = '';


    for (let i = 0; i < comments.length; i++) {
        // let commentHTML = '<div class = "comment-section">';
        if (i == 0) {
            let commentBtnHTML = document.querySelector('.post-comment-btn.text-right')
            console.log(commentBtnHTML);
            commentBtnHTML.innerHTML = '';
            commentBtnHTML.innerHTML = '<button type="button" class="btn btn-primary" id="post-comment-btn">Post comment</button>';
        }
        const comment = comments[i];
        let commentHTML =
            `<div class = "comment-section">
                    <div class="comment">${comment.comment}</div>
                    <div class="comment-footer">`
        if (comment.replies.length == 1) {
            commentHTML += `<button class="btn show-btn d-inline-block" data-id=${i}>Show Reply
                                <i class="fas fa-caret-down"></i>
                            </button>`
        } else if (comment.replies.length > 1) {
            commentHTML += `<button class="btn show-btn d-inline-block" data-id=${i}>Show Replies
                                <i class="fas fa-caret-down"></i>
                            </button>`
        }

        if (comment.userIcon != null) {
            commentHTML += `<img src="${comment.userIcon}"</img>`
        }

        commentHTML += `<div class="username d-inline-block">${comment.username}</div>
                        <div class="edit-time d-inline-block">${comment.editTime}</div>
                        <button class="btn reply-btn hide"  data-outerreply = 'true' data-id=${i}>
                            <i class="fas fa-reply"></i>
                        </button>
                        <button class="btn edit-btn hide" data-outerEdit = 'true' data-id=${i}>
                            <i class="fas fa-pencil-alt "></i>
                        </button>
                        <button class="btn trash-btn hide" data-outerTrash = 'true' data-id=${i}>
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`

        for (let j = 0; j < comment.replies.length; j++) {
            commentHTML +=
                `<div class="col-xl-6 hide" data-use="hiding" data-id=${i}></div>
                <div class = "col-xl-6 replies-section hide" data-use="hiding" data-id=${i}>`
            for (let k = 0; k < comment.replies[j].referring.length; k++) {
                let totalIndentation = comment.replies[j].referring.length * 10 - k * 10;
                commentHTML +=
                    `<div class="referring-comment" style="padding-left:${totalIndentation}px">${comment.replies[j].referring[k].comment}</div>`
            }
            commentHTML +=
                `<div class="comment">${comment.replies[j].comment}</div>
                        <div class="comment-footer">`
            if (comment.userIcon != null) {
                commentHTML += `<img src="${comment.replies[j].userIcon}"</img>`
            }
            commentHTML +=
                `<div class="username d-inline-block">${comment.replies[j].username}</div>
                        <div class="edit-time d-inline-block">${comment.replies[j].editTime}</div>
                        <button class="btn reply-btn hide" data-outerreply ='false' data-outerid = ${i} data-id=${j}>
                            <i class="fas fa-reply"></i>
                        </button>
                        <button class="btn edit-btn hide" data-innerEdit = 'true' data-outerid = ${i} data-id=${j}>
                            <i class="fas fa-pencil-alt "></i>
                        </button>
                        <button class="btn trash-btn reply-trash-btn hide" data-innerTrash = 'true' data-outerid = ${i} data-id=${j}>
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>`
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
                                outerID: editBtn.dataset.outerid,
                                content: {
                                    comment: newValue
                                }
                            })
                        })
                        let result = await fetchRes.json();
                        alert(await result.message);

                    } else {
                        console.log(outer)
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
                main();
            })
        })
    }
    // ~~~~~~~~~~~Edit Replies~~~~~~~~~~
    // const replyEdits = document.querySelectorAll("[data-innerEdit = 'true']")
    // // console.log(edits)
    // for (const replyEdit of replyEdits) {
    //     // console.log(edit)
    //     replyEdit.addEventListener('click', (event) => {
    //         const editBtn = event.currentTarget;
    //         const commentDiv = editBtn.parentNode.parentNode.querySelector(".comment")
    //         const comment = commentDiv.innerHTML;
    //         commentDiv.innerHTML = `<textarea id="form24" class="md-textarea form-control text-area" rows="3">${comment}</textarea>`
    //         commentDiv.querySelector("textarea").focus();
    //         // document.getElementById(btn.id).disabled = true;
    //         commentDiv.querySelector("textarea").addEventListener('blur', async (event) => {
    //             const newValue = commentDiv.querySelector('textarea').value;
    //             if (comment != newValue) {
    //                 commentDiv.innerHTML = newValue;
    //                 console.log(editBtn.dataset.outid)
    //                 const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
    //                     method: 'PATCH',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         orderID: editBtn.dataset.id,
    //                         outerID: editBtn.dataset.outid,
    //                         content: { 
    //                             comment: newValue
    //                          }
    //                     })
    //                 })
    //                 let result = await fetchRes.json();
    //                 alert(await result.message);
    //             }
    //             main();
    //         })
    //     })
    // }

}

async function deleteComment() {
    const trashes = document.querySelectorAll("[data-outerTrash = 'true']");
    for (let trash of trashes) {
        trash.addEventListener('click', async (event) => {
            const trashBtn = event.currentTarget;
            console.log(trashBtn.dataset.id);
            await fetch(`/api/v1/comment/${category}/${dish}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderID: `${trashBtn.dataset.id}`,
                    replyTrash: false
                })
            })
            await main();
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
                    outerID: `${trashBtn.dataset.outerid}`,
                    replyTrash: true
                })
            })
            await main();
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
                    username: "Ivan",
                    userIcon: "Hi.jpg",
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
    const replyFunc = function (event) {

    }
    for (let i = 0; i < replies.length; i++) {
        replies[i].addEventListener('click', (event) => {
            const replyBtn = event.currentTarget;
            let replyHTML = '';
            let outerreply = replyBtn.getAttribute('data-outerreply') == 'true'

            replyHTML =
                `<div class ='col-xl-4'></div>
                <div class = "col-xl-8 comment-section reply-section" data-id=${i}>
                        <div class="comment"><textarea class="reply-area" data-id=${i} data-outerreply='${outerreply}' placeholder="Leave Comments~~👅"></textarea></div>
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
                    console.log(replyBtn.dataset.outerid, replyBtn.dataset.id)
                    const fetchRes = await fetch(`/api/v1/comment/${category}/${dish}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            content: {
                                outerID: replyBtn.dataset.outerid,
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
                main();
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
            console.log('working');
            console.log(showBtn.classList);
            const hides = document.querySelectorAll(`[data-use=hiding][data-id='${showBtn.dataset.id}'`)
            console.log(hides)
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
    const sections = document.querySelectorAll('.replies-section, .comment-section')
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


async function main() {
    await readComment();
    editComment();
    postComment();
    deleteComment();
    replyComment();
    showMore();
    showBtns();
}

main();

window.onload = function () {
    //
}