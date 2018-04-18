const makePlayer = player => `
<div class="col-12 col-md-3">
  <div class="card mb-4 box-shadow">
  <img class="card-img-top" src="${player.image}" alt="avatar" />
    <div class="card-body">
      <p class="card-text">${player.nickname}</p>
    </div>
  </div>
</div>`

export default makePlayer 