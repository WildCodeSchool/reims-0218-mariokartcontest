const makePlayer = player => `
<div class="col-lg-3 col-md-4 col-sm-6">
  <div class="bgCardMember card mb-4 box-shadow">
    <img class="card-img-top " src="${player.image}" alt="avatar" />
    <div class="card-body">
      <p class="card-text nicknameMember">${player.nickname}</p>
    </div>
  </div>
</div>`

export default makePlayer
