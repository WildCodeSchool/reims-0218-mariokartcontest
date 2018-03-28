const express = require('express')
const app = express()

app.use(express.static('public'))

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Mario Kart Contest</title>
    <link rel="stylesheet" href="bootstrap.min.css" />
  </head>
  <body>
    <div id="main">
    </div>
  </body>
</html>`

app.get('*', (req, res) => {
  res.send(html)
  res.end()
})

app.listen(3000)