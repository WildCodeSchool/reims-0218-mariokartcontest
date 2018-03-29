const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = member => {
  console.log(member)
}

const controllers = {
  '/': () => 
    fetch('/members')
    .then(res => res.json())
    .then(members => members.reduce((carry, member) => carry + makeCard(member),''))
    .then(album => render(
      `<div class="container">
        <div class="jumbotron">
          <h1 class="display-3">Welcome to Mario Kart Tournament</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a class="btn btn-primary btn-lg" href="/about" role="button">Learn more »</a></p>
          <p><a class="btn btn-success btn-lg" href="/users/new" role="button">Add a member »</a></p>
        </div>
      </div>`)
    ),
    '*': () => render('<h1>Not Found</h1>'),
}

const route = pathname => {
}

(() => {

  ['/', '*'].forEach(
    path => page(path, controllers[path])
  )
  page()
})()
