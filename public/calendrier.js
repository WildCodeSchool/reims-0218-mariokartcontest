import navbar from './navbar.js'
import makeRace from './race.js'
import { render } from './utils.js'

export const calendrier = () =>
fetch('/courses')
.then(res => res.json())
.then(races => races.reduce((carry, race) => carry + makeRace(race),''))
.then(gpCard => {
  render(`
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
          // pass the adminToken
          fetch('/addPlayerToRace', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(addPlayerToRaceData)
          },
          window.location = "/calendrier"
          )
          })
        }
      })
      $(addPlayerModal).modal('show')
    })
  }
})


export default calendrier
