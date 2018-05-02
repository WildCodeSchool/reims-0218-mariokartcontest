import { tokenAdmin } from './utils.js'

export const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
  <img src="https://78.media.tumblr.com/cdcb363107631b897d58050707df8859/tumblr_ou4ju4oOZy1w76j7uo6_400.gif" width="50" height="50" alt="">Mario Kart Contest</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item">
    <a class="nav-link" href="/listMembers">Participants</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="/members/new">S'inscrire</a>
      </li>
      ${
        tokenAdmin() ?
        `<li class="nav-item">
          
        </li>`
        : ''
      }
      <li class="nav-item">
        <a class="nav-link" href="/calendrier">Calendrier</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/classement">Classement</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/information">A propos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/admin">Admin</a>
      </li>
    </ul>
  </div>
</nav>`

export default navbar