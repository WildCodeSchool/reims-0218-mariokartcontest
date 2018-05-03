export const makeRaceList = raceList => `<li><img src="${raceList.image}" alt="avatar" class="mr-3 mt-3 avatar rounded-circle"> ${raceList.nickname}</li>`


const tokenAdmin = () => localStorage.getItem('token')


const makeRace = race => {
  let lis = '' 
  for (let player of race.players) {
    lis += makeRaceList(player)
  }
  return `
  <div class="col-12 col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body color">
        <p class="card-text name">${race.nameRace}</p>
        <ul>${lis}</ul>
        <div class"mr-3">
        ${tokenAdmin() ? `<button type="button" class="btn btn-outline-info add-player buttonAjoutJoueur" data-race-id="${race.id}">+</button>`: ''}
        </div>
      </div>
    </div>
  </div>`
}

export default makeRace
