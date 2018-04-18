export const makePlayerList = playerList => `<li>${playerList.nickname}</li>`

const makeRace = race => {
  console.log(race)
  let lis = '' 
  for ( let player of race.players )
  
  {
    lis += makePlayerList(player)
  }
  return `
  <div class="col-12 col-md-3">
  <div class="card mb-4 box-shadow">
    <div class="card-body">
      <p class="card-text">${race.date}</p>
      <ul>${lis}</ul>
    </div>
  </div>
</div>`
}



export default makeRace