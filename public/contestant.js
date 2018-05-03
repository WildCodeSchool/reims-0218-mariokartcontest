import navbar from './navbar.js'
import makePlayer from './players.js'
import { render } from './utils.js'

export const contestant = () =>
  fetch('/members')
  .then(res => res.json())
  .then(members => members.reduce((carry, member) => carry + makePlayer(member),''))
  .then(album => render (`
    ${navbar}
    <div class="container mt-4">
      <div class="jumbotron wallpaper">
        <h1 class="display-3">Liste des participants</h1>
      </div>
      <div class="card titleContestant mb-3 mt-4">
        <div class="card-body">
          <h5 class="card-title mb-5">Reglement</h5>
            <p class="card-text rules">Premiere regle : il est interdit de parler du tournoi.</p>
            <p class="card-text rules">Deuxieme regle : il est interdit de parler du tournoi.</p>
            <p class="card-text rules">Troisieme regle : quelqu'un crie stop, quelqu'un s'ecroule ou n'en peut plus, la course est terminee.</p>
            <p class="card-text rules">Quatrieme regle : seulement quatre participants par courses.</p>
            <p class="card-text rules">Cinquieme regle : une seule course a la fois.</p>
            <p class="card-text rules">Sixieme regle : pas de costumes et pas de chaussures.</p>
            <p class="card-text rules">Septieme regle : les courses continueront aussi longtemps que necessaire.</p>
            <p class="card-text rules">Et huitieme regle : si c'est votre premiere soirée à la WCS, vous devez jouer.</p>
 
        </div>
      </div>
      <div class="row">${album}</div>
    </div>
  `)
  )

export default contestant
