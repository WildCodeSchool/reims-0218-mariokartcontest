import navbar from './navbar.js'
import makePlayer from './players.js'
import { render } from './utils.js'

export const contestant = () =>
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
)

export default contestant