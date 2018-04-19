export const makePlayerList = playerList => `<li>Classement de ${playerList.nickname} : ${playerList.position}</li>`

const makeClassement = classement => {
  let lis = '' 
  for ( let player of classement.players )
  
  {
    lis += makePlayerList(player)
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