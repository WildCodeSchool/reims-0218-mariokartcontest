const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = item => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.name}</p>
      </div>
    </div>
  </div>`

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
          <div class="row">${album}</div>
      </div>`)
    ),
    
    '/members/new': () => {
      //construit le formulaire
      render(
      `<div class="container">
        <div id="alert-box" class="hidden">
  
        </div>
        <form id="add-member">
          <div class="form-group">
            <label for="inputFirstName">First name</label>
            <input name="firstName" type="text" class="form-control" id="inputFirstName" placeholder="Enter first name">
          </div>
          <div class="form-group">
            <label for="inputGame">Last name</label>
            <input name="game" type="text" class="form-control" id="inputGame" placeholder="Enter last name">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>`
    )
      //js du formulaire
      const form = document.getElementById('add-member')
      form.addEventListener('submit', e => {
        e.preventDefault()
        const data = serializeForm(form)
        fetch('/members', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(member => {
          const alertBox = document.getElementById('alert-box')
          alertBox.className = 'alert alert-success'
          alertBox.innerHTML = `Successfully created member ${wilder.firstName} (${wilder.id})`
        })
      })
    },

    '*': () => render('<h1>Not Found</h1>'),
}





const route = pathname => {
}

(() => {

  ['/',
   '/members',
   '/members/new',
   '*',

  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()
