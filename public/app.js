import makePlayer from './players.js'
import makeClassement from './classement.js'
import navbar from './navbar.js'
import calendrier from './calendrier.js';
import formulaire from './formulaire.js'
import admin from './admin.js'
import newRace from './newrace.js'
const mainDiv = document.getElementById('main')
 
const render = html => {
  mainDiv.innerHTML = html
}

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
      </div>
      `)
    ),
    '/calendrier': calendrier
    ,
    '/classement': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeClassement(race),''))
      .then(gpCard => {
        render(
        `${navbar}
        <div class="container">
          <div class="jumbotron ImageClassement">
            <h1 class="display-3 titleClassement">Classement</h1>
            <p></p>
            </div>
            <div class="row">${gpCard}</div>
        </div>
        `)
        // document.get...
        const buttonPositions = document.getElementsByClassName('add-position')
        for (let buttonPosition of buttonPositions) {
          //console.log(buttonPosition)
          buttonPosition.addEventListener('click', () => {
            const raceId = buttonPosition.dataset.raceId
            const playerId = buttonPosition.dataset.playerId
            const position = buttonPosition.dataset.position
            console.log(raceId, playerId, position)
            const addPositionToData = {
              race_id: raceId,
              player_id: playerId,
              position: position
            }
            fetch('/courses', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(addPositionToData)
            },
           // window.location = "/calendrier"
            )
            
          })
        }
      }
    ),

    '/race/new': newRace,

    '/admin': () => {
      render(`${admin}`)

      const logInForm = document.getElementById('logInForm')
      logInForm.addEventListener('submit', e => {
        e.preventDefault()
          //data
          const data = serializeForm(logInForm)
           console.log(data)

          //POST sur le serveur /auth/login
          fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            const alert = document.getElementById('alert-login')
            if(!data.user) {
              //alert class danger
              alert.innerHTML= `echec`
            } else {
              //store the token
              alert.innerHTML= `${data.user.username} est connecté`
              localStorage.setItem('token', data.token)
              logInForm.style.display= 'none'
            }
          });
      });
      document.getElementById('test').addEventListener('click', () => {
        const token = localStorage.getItem('token')
        console.log(token)
        fetch('test')
        .then(res => res.json())
        .catch(err => console.log(err))
      })
    },
    
    '/members/new': () => {
      //construit le formulaire
      render(
      `${formulaire}`
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
    </div>
    `
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
    '/admin',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}
//appel cette fonction pour gérer les routes
routing()
