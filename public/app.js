import makePlayer from './players.js'
import makeClassement from './classement.js'
import navbar from './navbar.js'
import calendrier from './calendrier.js';
import formulaire from './formulaire.js'
import admin from './admin.js'
import newRace from './newrace.js'
import information from './information.js'
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

    '/admin': admin,
    
    '/members/new': formulaire,
    
  '/information': information,

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
