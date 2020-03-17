const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // bodyParser.urlencoded()
      // 'Content-Type': 'application/json' // bodyParser.json()
    },
    body: 'username=' + username + '&password=' + password
    // body: JSON.stringify({username, password})
  })

