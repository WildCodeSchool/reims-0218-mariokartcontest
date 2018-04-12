  const sqlite = require('sqlite')
  const express = require('express')
  const Promise = require('bluebird')
  const bodyParser = require('body-parser')
  const usersSeed = require('./public/members.json')
  const racesSeed = require('./public/races.json')
  const playersHasRacesSeed = require('./public/players_has_races.json') 
  const app = express()
  let db

  app.use(express.static('public'))
  app.use(bodyParser.json())

  const insertMember = m => {
    const { image, name, nickname, email, password, } = m
    return db.get('INSERT INTO members(image, name, nickname, email, password) VALUES(?, ?, ?, ?, ?)', image, name, nickname, email, password)
    .then(() => db.get('SELECT last_insert_rowid() as id'))
    .then(({ id }) => db.get('SELECT * from members WHERE id = ?', id))
  }


  //date format YYYY-MM-DD HH:MM:SS.SSS
  const insertRace = r => {
    const { date, } = r
    return db.get('INSERT INTO races(date) VALUES(?)', date)
    .then(() => db.get('SELECT last_insert_rowid() as id'))
    .then(({ id }) => db.get('SELECT * from races WHERE id = ?', id))
  }

  const insertPlayerRace = pr => {
    const { race_id, player_id, position } = pr
    return db.get('INSERT INTO players_has_races(race_id, player_id, position) VALUES(?, ?, ?)', race_id, player_id, position)
    .then(() => db.get('SELECT * from players_has_races'))
  }


  // code qui remplit la db exemple
  const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(_db => {
    db = _db
    return db.migrate({ force: 'last' })
  })
  .then(() => Promise.map(usersSeed, m => insertMember(m)))
  .then(() => Promise.map(racesSeed, r => insertRace(r)))
  .then(() => Promise.map(playersHasRacesSeed, pr => insertPlayerRace(pr).then(pr => console.log(`player classement ${pr.race_id}`))))
    




  const html = `
  <!doctype html>
  <html class="no-js" lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Mario Kart Contest</title>
      <link rel="icon" type="image" href="favicon.ico"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">  
      <link rel="stylesheet" href="/style.css">
      </head>
    <body>
      <div id="main">
      </div>
    <script src="/page.js"></script>
    <script src="/app.js"></script>
    </body>
  </html>`

  app.get('/members', (req, res) => {
    db.all('SELECT * from members')
    .then(records => {
      return res.json(records)
    })
  })


  //CREATE
  app.post('/members', (req, res) => {
    return insertMember(req.body)
    .then(record => res.json(record))
  })

  app.get('/courses', (req, res) => {
    db.all(
      `SELECT * 
        from races
        join players_has_races on players_has_races.race_id = races.id
        join members on members.id = players_has_races.player_id
      `
    )
    .then(records => {
    
      const racesPlayers = records.map(
        race => ({
          id: race.race_id,
          date: race.date,
          player: {
            id: race.player_id,
            name: race.name,
            nickname: race.nickname,
            image: race.image,
            position: race.position
          }
        })
      ).reduce((acc, race) => {
        if (!acc[race.id]) {
          acc[race.id] = {
            id: race.id,
            date: race.date,
            players: [race.player]
          }
        } else {
          acc[race.id].players = [
            race.player,
            ...acc[race.id].players
          ]
        }
        return acc
      }, {})

      return res.json(Object.values(racesPlayers))
    })

  })

  //READ
  app.get('*', (req, res) => {
    res.send(html)
    res.end()
  })

  app.listen(3000)
