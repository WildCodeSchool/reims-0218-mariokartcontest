import { tokenAdmin } from './utils.js'

export const makePlayerListClassement = (playerListClassement, raceId) => {
  const choosePosition = `
    <button type="button" class="btn btn-outline-info add-position" data-position="1" data-player-id="${playerListClassement.id}" data-race-id="${raceId}">1</button>
    <button type="button" class="btn btn-outline-info add-position" data-position="2" data-player-id="${playerListClassement.id}" data-race-id="${raceId}">2</button>
    <button type="button" class="btn btn-outline-info add-position" data-position="3" data-player-id="${playerListClassement.id}" data-race-id="${raceId}">3</button>
    <button type="button" class="btn btn-outline-info add-position" data-position="4" data-player-id="${playerListClassement.id}" data-race-id="${raceId}">4</button>
  `

  return `<li><img src="${playerListClassement.image}" alt="avatar" class="mr-3 mt-3 avatar rounded-circle"> ${playerListClassement.nickname} : ${playerListClassement.position}
  </br> ${tokenAdmin() ? `${choosePosition}` :''}
  </li>`
}

const makeClassement = classement => {
  let lis = '' 
  for (let player of classement.players) {
    lis += makePlayerListClassement(player, classement.id)
  }
  return `
  <div class="col-12 col-md-4 mt-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body color">
      <p class="card-text name">${classement.nameRace}</p>
      <ul>${lis}</ul>
      </div>
    </div>
  </div>`
}
export default makeClassement
