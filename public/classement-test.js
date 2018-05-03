import { makePlayerListClassement } from './classement.js'
import makeClassement from './classement.js'
import { cleanHtml } from './utils.js'

const race = {
  id: 1,
  nameRace: "Course Champignon",
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
  <div class="col-12 col-md-3">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text">Course Champignon</p>
        <ul>
          <li>Classement de Elmoro : 4</li>
          <li>Classement de Marco : 2</li>
        </ul>
      </div>
    </div>
  </div>`)

describe ('makeClassement', () => {
  it ('should return a string', () => {
    chai.assert.typeOf(makeClassement(race),'string')
  })
  it ('should return an html string of a date', () => {
    const result = cleanHtml(makeClassement(race))
    chai.assert.equal(result, expectedHtml)
  })
})

const onePlayer = {
  nickname: "Elmoro",
  position : "4"
}

const expectedMakePlayerResult = `<li>Classement de Elmoro : 4</li>`

describe ('makePlayerListClassement', () => {
  it ('should return a string', () => {
    chai.assert.typeOf(makePlayerListClassement(onePlayer), 'string')
  })
  it ('should return an html string of a gamer li element', () => {
    const result = cleanHtml(makePlayerListClassement(onePlayer))
    chai.assert.equal(result, expectedMakePlayerResult)
  })
})
