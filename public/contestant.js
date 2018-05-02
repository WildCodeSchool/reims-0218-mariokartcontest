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
    <div class="row">${album}</div>
  </div>
  `)
)

export default contestant