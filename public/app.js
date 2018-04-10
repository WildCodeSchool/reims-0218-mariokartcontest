const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = item => `
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
    <img class="card-img-top" src="${item.image}" alt="Thumbnail [100%x225]" />
      <div class="card-body">
        <p class="card-text" style="height: 80px">${item.name}</p>
      </div>
    </div>
  </div>`


const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(el of elements) {
    data[el.name] = el.value
  }
  return data
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
          <p><a class="btn btn-success btn-lg" href="/members/new" role="button">Add a member »</a></p>
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
        <h2>Inscription pour le tournoi !</h2>
        <form id="add-member">
          <div class="form-group">
            <label for="inputName">Prénom</label>
            <input name="name" type="text" class="form-control" id="inputFirstName" placeholder="Entrez votre prénom">
          </div>
          <div class="form-group">
            <label for="inputNickname">Pseudo</label>
            <input name="nickname" type="text" class="form-control" id="inputNickname" placeholder="Entrez votre pseudo">
          </div>
            <p>Choisissez votre équipe</br></p>
           <div class="form-check form-check-inline">
              <input class="form-check-input form-control"  type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
              <label class="form-check-label" for="inlineRadio1">TEAM WILD</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input form-control" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
              <label class="form-check-label" for="inlineRadio2">TEAM CAPSULE</label>
           </div>
           <div class="form-group">
           <label for="inputImageUrl">Image URL</label>
           <input name="image" type="text" class="form-control" id="inputImageUrl" placeholder="Enter image URL">
         </div> 
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input name="email" type="text" class="form-control" id="inputEmail" placeholder="Saisissez votre email">
          </div>
          <div class="form-group">
            <label for="inputPassword">Mot de passe</label>
            <input name="motDePasse" type="password" class="form-control" id="inputPassword" placeholder="Saisissez votre mot de passe">
          </div>
          <button type="submit" class="btn btn-primary">S'enregistrer</button>
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
        })//appel cette fonction pour gérer les routes
        .then(res => res.json())
        .then(members => {
          const alertBox = document.getElementById('alert-box')
          alertBox.className = 'alert alert-success'
          alertBox.innerHTML = `Successfully created member ${members.name}`
        })
      })
    },


    '*': () => render('<h1>Not Found</h1>'),
}

const routing = () => {
  const routes = [
    '/',  
    '/members/new',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}
//appel cette fonction pour gérer les routes
routing()
