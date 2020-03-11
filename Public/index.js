// Web site (fetch something from server)

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

let isAdmin = false;

async function readMemos() { //method "GET" 
  const fetchRes = await fetch('/memos'); // fetch the memo and then put to memos webpage
  const memos = await fetchRes.json(); // fetch something from index js respond (res.json(memos))

  document.querySelector('.memos').innerHTML = ''; // html file class memos , empty is required, to avoid duplicated memo 
  for (let i = 0; i < memos.length; i++) {
    const memo = memos[i]
    let memoHTML = `<div>`;
    memoHTML += '<div class="content">' + memo.content + '</div>';
    if (memo.image != null) {
      memoHTML += `<img src="${memo.image}">`;
    }

    if (isAdmin) {
      memoHTML += `<button class="edit action-button" data-id="${i}"><i class="fas fa-edit"></i></button>`
      memoHTML += `<button class="trash action-button" data-id="${i}"><i class="fas fa-car-crash"></i></button>`

      if (memo.image != null) {
        memoHTML += `<button class="trash-img action-button" data-id="${i}"><i class="fas fa-trash-alt"></i></button>`
      } else {
        memoHTML += `<button class="upload-img action-button" data-id="${i}"><i class="fas fa-file-upload"></i></button>`
      }
    }
    memoHTML += '</div>'
    
    document.querySelector('.memos').innerHTML += memoHTML; // add something into innerHTML

    // await sleep(1000);
  }

  const edits = document.querySelectorAll('.edit')
  for (const edit of edits) {
    edit.addEventListener('click', async (event) => {
      const button = event.currentTarget;

      const contentDiv = button.parentNode.querySelector('.content');
      const content = contentDiv.innerHTML;

      contentDiv.innerHTML = `<textarea>${content}</textarea>`
      contentDiv.querySelector('textarea').focus(); // focus on text area
      contentDiv.querySelector('textarea').addEventListener('blur',async (event) => {
        const newValue = contentDiv.querySelector('textarea').value
        contentDiv.innerHTML = newValue;

        await fetch('/memos/' + button.dataset.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: newValue
          })
        })

      })
    });
  }

  const trashImgs = document.querySelectorAll('.trash-img')
  for (const trash of trashImgs) {
    trash.addEventListener('click', async (event) => {
      const button = event.currentTarget;

      await fetch('/memos/' + button.dataset.id + '/image', {
        method: 'DELETE'
      });

      readMemos();
    })
  }

  const trashs = document.querySelectorAll('.trash')
  for (const trash of trashs) {
    trash.addEventListener('click', async (event) => {
      const button = event.currentTarget;

      await fetch('/memos/' + button.dataset.id, {
        method: 'DELETE'
      });

      readMemos();
    })
  }

  const uploads = document.querySelectorAll('.upload-img')
  for (const upload of uploads) {
    upload.addEventListener('click', async (event) => {
      const button = event.currentTarget;
      const listener = async () => {
        const form = document.querySelector('#upload-image-form')
        
        await fetch('/memos/' + button.dataset.id + '/image', {
          method: 'PUT',
          body: new FormData(form)
        })

        document.querySelector('#upload-image-form input[type=file]').removeEventListener('change', listener)

        readMemos();
      };

      document.querySelector('#upload-image-form input[type=file]').click()
      document.querySelector('#upload-image-form input[type=file]').addEventListener('change', listener);
    })
  }
}


//stateless
// server                            client
//       <-- login                 --
//       --- set-cookie: ...       -->
//       <-- cookie: username=alex --
//       --- news feed             -->

//cookie < header
document.querySelector('form#add-message-form').addEventListener('submit', async (event) => {
  const form = event.currentTarget;
  event.preventDefault(); //stop post memo to html file one by one

  // if (document.querySelector('form#add-message-form textarea').value == '') {
  //   alert('貼 memo 都要講句嘢架～')
  //   return;
  // }

  const submitButton = document.querySelector('form#add-message-form input[type=submit]')  
  submitButton.disabled = true
  setTimeout(() => {
    submitButton.disabled = false
  }, 5000); // set 5s later only can press submit button

  const formData = new FormData(form); // whole form data post to html file
  form.reset();

  await fetch('/memos', {
    method: 'POST',
    body: formData  
  })

  readMemos(); // due to rewrite memos web page body formdata, so re call rememo function to run fetch memos webpage and then update to html file
})

document.querySelector('form#login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  const username = document.querySelector('[name=username]').value
  const password = document.querySelector('[name=password]').value

  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // bodyParser.urlencoded()
      // 'Content-Type': 'application/json' // bodyParser.json()
    },
    body: 'username=' + username + '&password=' + password
    // body: JSON.stringify({username, password})
  })

  //                   vvvvvvvv fetch
  const result = await res.json();
  if (result.success) {
    isAdmin = true;
    readMemos();
  } else {
    alert('扮晒蟹，你唔係 Admin!!!!');
  }

})

async function getCurrentUser() {
  const res = await fetch('/currentUser')
  console.log('fetch 的 res', res)
  console.log('fetch 的 res.body', res.body)

  const result = await res.json();
  console.log('res.json() 處理後的 result', result)

  if (result.role === 'admin') {
    isAdmin = true;
    readMemos();
  }
}

getCurrentUser();

readMemos();
