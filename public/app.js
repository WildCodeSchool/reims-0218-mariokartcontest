const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
  <img src="https://78.media.tumblr.com/cdcb363107631b897d58050707df8859/tumblr_ou4ju4oOZy1w76j7uo6_400.gif" width="50" height="50" alt="">Mario Kart Contest</a>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/information">A propos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/members/new">S'inscrire</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/calendrier">Calendrier</a>
      </li>
    </ul>
  </div>
</nav>`

const makeCard = item => `
  <div class="col-12 col-md-3">
    <div class="card mb-4 box-shadow">
    <img class="card-img-top" src="${item.image}" alt="avatar" />
      <div class="card-body">
        <p class="card-text">${item.nickname}'s profile</p>
      </div>
    </div>
  </div>`

const makeRaceCard = race => {

  let liste = `<ul>`

      for (let i = 0 ; i < race.players.length ; i++){
      console.log(`${race.players[i].name}`)

      //renvoi la lite des players dans la card
      liste += `<li>${race.players[i].name}</li>`
      // console.log (liste)
      }


return `
<div class="col-12 col-md-3">
  <div class="card mb-4 box-shadow">
    <div class="card-body">
      <p class="card-text">${race.date}</p>
      <p class="card-text">${liste}</p>
    </div>
  </div>
</div>`}
  // parcourir race.players pour faire une liste html

  const makeClassement = race => {

    let liste = `<ul>`

        for (let i = 0 ; i < race.players.length ; i++){
        console.log(`${race.players[i].name}`)

        //renvoi la lite des players dans la card
        liste += `<li> Classement de ${race.players[i].name} : ${race.players[i].position}</li>`
        // console.log (liste)
        }


  return `
  <div class="col-12 col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text">${race.date}</p>
        <p class="card-text">${liste}</p>
      </div>
    </div>
  </div>`}



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
      `${navbar}
      <div class="container">
        <div class="jumbotron wallpaper">
          <h1 class="display-3">Welcome to Mario Kart Tournament !</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>

        </div>



          <div class="row">${album}</div>
      </div>`)
    ),
    '/calendrier': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeRaceCard(race),''))
      .then(gpCard => render(
        `${navbar}
        <div class="container">
          <div class="jumbotron">
            <h1 class="display-3">Calendrier</h1>
            <p></p>
            <p><a class="btn btn-success btn-lg" href="/" role="button">Accueil</a></p>
            </div>
            <div class="row">${gpCard}</div>
        </div>`)

      ),

    '/classement': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeClassement(race),''))
      .then(gpCard => render(
        `<div class="container">
          <div class="jumbotron ImageClassement">
            <h1 class="display-3 titleClassement">Classement</h1>
            <p></p>
            <p><a class="btn btn-success btn-lg boutonAcceuilClassement" href="/" role="button">Accueil</a></p>
            </div>
            <div class="row">${gpCard}</div>
        </div>`)


    ),

    '/members/new': () => {
      //construit le formulaire
      render(
      `${navbar}
      <div class="container">
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
          alertBox.innerHTML += `${members.name} est inscrit`
          alertBox.innerHTML += `\n Vous allez être redirigés vers la page d'acceuil`
        })
        window.setTimeout(() =>
        { window.location = "/"; },3000);
      })
    },
    '/information': () => render(
    `${navbar}
      <div class="container">
        <section class="jumbotron text-center">
          <h1 class="jumbotron-heading">A propos</h1>
          <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <a class="btn btn-primary btn-lg" href="/" role="button">Accueil»</a>
        </section>
      </div>`
    ),

    '*': () => render('<h1>Not Found</h1>'),
}

const routing = () => {
  const routes = [
    '/',
    '/members/new',
    '/information',
    '/calendrier',
    '/classement',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}
//appel cette fonction pour gérer les routes
routing()
