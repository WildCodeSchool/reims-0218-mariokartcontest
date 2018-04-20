import makePlayer from './players.js'
import makeRace from './race.js'
import makeClassement from './classement.js'
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
        <a class="nav-link" href="/members/new">S'inscrire</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/calendrier">Calendrier</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/classement">Classement</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/information">A propos</a>
    </ul>
  </div>
</nav>`

const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(let el of elements) {
    data[el.name] = el.value
  }
  return data
}

const controllers = {
  '/': () =>
    fetch('/members')
    .then(res => res.json())
    .then(members => members.reduce((carry, member) => carry + makePlayer(member),''))
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
      .then(races => races.reduce((carry, race) => carry + makeRace(race),''))
      .then(gpCard => {
        render(
          `
          <div class="modal fade" id="addPlayerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="add-player-modal" class="modal-body">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>  
          ${navbar}
          <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
          </button> --!>
          <div class="container">
            <div class="jumbotron">
              <h1 class="display-3">Calendrier</h1>
              <p></p>
              <p><a class="btn btn-success btn-lg" href="/" role="button">Accueil</a></p>
              </div>
              <div class="row">${gpCard}</div>
          </div>`
        )
        // get all the btn addPlayer using document.getElementsByClass
        const addPlayerButtons = document.getElementsByClassName('add-player')
        const addPlayerModal = document.getElementById('addPlayerModal')
        for (let addPlayerButton of addPlayerButtons) {
          addPlayerButton.addEventListener("click", () =>  {
            // ici récupérer race Id 
            const raceId = addPlayerButton.dataset.raceId
            fetch('/members')
            .then(res => res.json())
            .then(members => {
              let liste = ""
              for ( let member of members){
                liste += `<li class="select-player" data-member-id="${member.id}">${member.name}</li>`
              }
              const addPlayerModal = document.getElementById('add-player-modal')
              addPlayerModal.innerHTML = `<ul>${liste}</ul>`
              const selectPlayers = document.getElementsByClassName('select-player')
              for ( let selectPlayer of selectPlayers) {
                selectPlayer.addEventListener('click', () => {
                 const playerId = selectPlayer.dataset.memberId
                  // récupérer player id
                const addPlayerToRaceData = {
                  race_id: raceId,
                  player_id: playerId,
                  position: 0
                }
                fetch('/addPlayerToRace', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(addPlayerToRaceData)
                },
                )
                })
              }
            })
            $(addPlayerModal).modal('show')
          })
        }
      }),
    '/classement': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeClassement(race),''))
      .then(gpCard => render(
        `${navbar}
        <div class="container">
          <div class="jumbotron ImageClassement">
            <h1 class="display-3 titleClassement">Classement</h1>
            <p></p>
            <p><a class="btn btn-success btn-lg boutonAcceuilClassement" href="/" role="button">Accueil</a></p>
            </div>
            <div class="row">${gpCard}</div>
        </div>`)
    ),

    '/race/new': () => {
      render(`
          ${navbar}
          <div class="container">
            <div id="alert-box" class="hidden">
          </div>
          <h2>Création de la course</h2>
          <form id="add-race">
          <div class="form-group">
          <label for="inputdate">Date de la course (YYYY-MM-DD HH:MM:SS.SSS)</label>
            <input name="date" type="text" class="form-control" id="inputFirstName" placeholder="YYYY-MM-DD HH:MM:SS.SSS">
          </div>
          

          <button type="submit" class="btn btn-primary">Créer votre course</button>
        </form>
      </div>`
      )


      //js du formulaire création de course
      const form = document.getElementById('add-race')
      form.addEventListener('submit', e => {
        e.preventDefault()
        const data = serializeForm(form)
        fetch('/race', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })//appel cette fonction pour gérer les routes
        .then(res => res.json())
        .then(races => {
          const alertBox = document.getElementById('alert-box')
          alertBox.className = 'alert alert-success'
          alertBox.innerHTML += `Course créée`
         // alertBox.innerHTML += `\n Vous allez être redirigés vers la page d'acceuil`
        })
        window.setTimeout(() =>
        { window.location = "/"; },3000);
      })
    },
    
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
    '/race/new',
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
