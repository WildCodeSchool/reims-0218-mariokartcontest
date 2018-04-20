export const makePlayerListClassement = playerListClassement => `<li>Classement de ${playerListClassement.nickname} : ${playerListClassement.position}</li>`

const makeClassement = classement => {
  let lis = '' 
  for (let player of classement.players) {
    lis += makePlayerListClassement(player)
  }
  return `
  <div class="col-12 col-md-3">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
      <p class="card-text">${classement.date}</p>
      <ul>${lis}</ul>
      </div>
    </div>
  </div>`
}

export default makeClassement
