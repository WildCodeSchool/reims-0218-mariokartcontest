import makePlayer from './players.js';
//import {cleanHTML} from './utils.js'
 

const player = {
  "name" : "Anahita",
  "nickname" : "Erenude",
  "email": "anahita.vahdani@neuf.fr",
  "password":"motdepasse",
  "image": "https://ih1.redbubble.net/image.52041676.7393/flat,800x800,070,f.u2.jpg"
}

const expectedHtml =  `
<div class="col-12 col-md-3">
  <div class="card mb-4 box-shadow">
  <img class="card-img-top" src="https://ih1.redbubble.net/image.52041676.7393/flat,800x800,070,f.u2.jpg" alt="avatar" />
    <div class="card-body">
      <p class="card-text">Erenude's profile</p>
    </div>
  </div>
</div>`

describe ('makePlayer ', ()=> {
  it ('should return a string',()=>{
    chai.assert.typeOf(makePlayer(player),'string')
  })
  // it ('should return an html string of a player', () => {
  //    const result = cleanHtml(makePlayer(somePlayer))
  //   chai.assert.equal(makePlayer(player), expectedHtml)
  // })
})