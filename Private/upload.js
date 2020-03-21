document.querySelector('#addMessageForm').addEventListener('submit', async (event) => {
  const form = event.currentTarget // event.currentTarget = event.target
  event.preventDefault()
  if(document.querySelector('#addMessageForm textarea').value == ""){ // adopt innerHtml or Value depends on typing textBox or not 
    alert("please type something on text Box")
    return
  }
  //if(document.querySelector('#addMessageForm textarea')
  const formData = new FormData(form)
  form.reset()
  await fetch('/videos',{
    method: 'POST',
    body: formData
  })
   
})
