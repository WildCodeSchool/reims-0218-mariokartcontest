import makeRace from './race.js'

const race = {
    "date" : "2018-04-12 12:00:00"
}
const expectedHtml = `
    <div class="col-12 col-md-3">
      <div class="card mb-4 box-shadow">
        <div class="card-body">
          <p class="card-text">"2018 04 12"</p>
          <p class="card-text">"12h00"</p>
        </div>
      </div>
    </div>`

describe ('makeRace ', ()=> {
    it ('should return a string',()=>{
      chai.assert.typeOf(makeRace(race),'string')
    })
  })

  