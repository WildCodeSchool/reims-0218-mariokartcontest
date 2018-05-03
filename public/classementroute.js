import navbar from './navbar.js'
import makeClassement from './classement.js'
import { render } from './utils.js'

export const classementRoute = () => {
  fetch('/courses')
  .then(res => res.json())
  .then(races => races.reduce((carry, race) => carry + makeClassement(race),''))
  .then(gpCard => {
    render(
      `${navbar}
      <div class="container">
        <div class="jumbotron ImageClassement ">
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
        })  
        page('/classement')
        page()   
      })
    }
    
  })
}

export default classementRoute
