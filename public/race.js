export const makeRaceList = raceList => `<li>${raceList.nickname}</li>`

const makeRace = race => {
  let lis = '' 
  for (let player of race.players) {
    lis += makeRaceList(player)
  }
  return `
  <div class="col-12 col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text">${race.date}</p>
        <ul>${lis}</ul>
        <div class"mr-3">
        <button type="button" class="btn btn-outline-info add-player" data-race-id="${race.id}">Ajout joueurs</button>
        </div>
      </div>
    </div>
  </div>`
}

export default makeRace

