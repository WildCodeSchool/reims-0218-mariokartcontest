import navbar from './navbar.js'
import makePlayer from './players.js'
import { render } from './utils.js'

export const contestant = () =>
fetch('/members')
.then(res => res.json())
.then(members => members.reduce((carry, member) => carry + makePlayer(member),''))
.then(album => render(
  `${navbar}
  <div class="container mt-4">
    <div class="jumbotron wallpaper">
      <h1 class="display-3">Liste des participants</h1>
    </div>
    <div class="card text-white bg-dark mb-3 mt-4" style="max-width: 75rem;">
      <div class="card-body">
        <h5 class="card-title">Reglement</h5>
        <ul>
          <li class="card-text">Un joueur doit participer a au moins 3 courses.</li>
          <li class="card-text">Une course comportera 4 joueurs maximum.</li>
          <li class="card-text">Un classement sera etabli comme suit : 3 points pour le premier, 2 points pour le second et 1 point pour le troisieme.</li>
        </ul>
      </div>
    </div>
    <div class="row">${album}</div>
  </div>
  `)
)

export default contestant