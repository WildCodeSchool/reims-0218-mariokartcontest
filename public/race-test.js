import { makeRaceList } from './race.js'
import makeRace from './race.js'
import { cleanHtml } from './utils.js'

const race = {
  id: 1,
  date: "2018-04-12 12:00:00",
  players: [
    { 
      id: 4,
      name: "Anthony",
      nickname: "Elmoro",
      image: "http://www.culture-games.com/wp-content/uploads/personnages/Sephiroth_Portrait.jpg",
      position: 4
    },
    {
      id: 3,
      name: "Khalid",
      nickname: "Marco",
      image: "http://s1.e-monsite.com/2009/06/13/03/62923709normal-bowser-jpg.jpg",
      position: 2
    }
  ]
}

const expectedHtml = cleanHtml (`
  <div class="col-12 col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text">2018-04-12 12:00:00</p>
        <ul>
          <li>Elmoro</li>
          <li>Marco</li>
        </ul>
        <div class"mr-3">
        <button type="button" class="btn btn-outline-info add-player" data-race-id="${race.id}">Ajout joueurs</button>
        </div>
      </div>
    </div>
  </div>`)

describe ('makeRace ', () => {
  it ('should return a string',() => {
  chai.assert.typeOf(makeRace(race), 'string')
  })
  it ('should return an html string of a date', () => {
    const result = cleanHtml(makeRace(race))
    chai.assert.equal(result, expectedHtml)
  })
})

const onePlayer = {
  nickname: "Elmoro"
}

const expectedMakePlayerResult = `<li>Elmoro</li>`

describe ('makeRaceList', () => {
  it ('should return a string',() => {
    chai.assert.typeOf(makeRaceList(onePlayer), 'string')
  })
  it ('should return an html string of a gamer li element', () => {
    const result = cleanHtml(makeRaceList(onePlayer))
    chai.assert.equal(result, expectedMakePlayerResult)
  })
})
