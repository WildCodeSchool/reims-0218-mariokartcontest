import makePlayer from './players.js'
import makeRace from './race.js'
import makeClassement from './classement.js'
const mainDiv = document.getElementById('main')
 
const render = html => {
  mainDiv.innerHTML = html
}

const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
  <img src="https://78.media.tumblr.com/cdcb363107631b897d58050707df8859/tumblr_ou4ju4oOZy1w76j7uo6_400.gif" width="50" height="50" alt="">Mario Kart Contest</a>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/members/new">S'inscrire</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/calendrier">Calendrier</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/classement">Classement</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/information">A propos</a>
    </ul>
  </div>
</nav>`

const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(let el of elements) {
    data[el.name] = el.value
  }
  return data
}

const controllers = {
  '/': () =>
    fetch('/members')
    .then(res => res.json())
    .then(members => members.reduce((carry, member) => carry + makePlayer(member),''))
    .then(album => render(
      `${navbar}
      <div class="container">
        <div class="jumbotron wallpaper">
          <h1 class="display-3">Welcome to Mario Kart Tournament !</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        </div>
        <div class="card text-white bg-dark mb-3 mt-4" style="max-width: 75rem;">
        <div class="card-body">
          <h5 class="card-title">Reglement</h5>
          <ul>
          <li class="card-text">Un joueur doit participer à au moins 3 courses.</li>
          <li class="card-text">Une course sera disputée par 4 joueurs maximum.</li>
          <li class="card-text">Un classement sera etabli comme suit : 3 points pour le premier, 2 points pour le second et 1 point pour le troisieme.</li>
          </ul>
        </div>
      </div>
        <div class="row">${album}</div>
      </div>`)
    ),
    '/calendrier': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeRace(race),''))
      .then(gpCard => {
        render(
          `
          <div class="modal fade" id="addPlayerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div id="add-player-modal" class="modal-body">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>  
          ${navbar}
          <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
          </button> --!>
          <div class="container">
            <div class="jumbotron">
              <h1 class="display-3">Calendrier</h1>
              <p></p>
              <p><a class="btn btn-success btn-lg" href="/" role="button">Accueil</a></p>
              </div>
              <div class="row">${gpCard}</div>
          </div>`
        )
        // get all the btn addPlayer using document.getElementsByClass
        const addPlayerButtons = document.getElementsByClassName('add-player')
        const addPlayerModal = document.getElementById('addPlayerModal')
        for (let addPlayerButton of addPlayerButtons) {
          addPlayerButton.addEventListener("click", () =>  {
            // ici récupérer race Id 
            const raceId = addPlayerButton.dataset.raceId
            fetch('/members')
            .then(res => res.json())
            .then(members => {
              let liste = ""
              for ( let member of members){
                liste += `<li class="select-player" data-member-id="${member.id}">${member.name}</li>`
              }
              const addPlayerModal = document.getElementById('add-player-modal')
              addPlayerModal.innerHTML = `<ul>${liste}</ul>`
              const selectPlayers = document.getElementsByClassName('select-player')
              for ( let selectPlayer of selectPlayers) {
                selectPlayer.addEventListener('click', () => {
                 const playerId = selectPlayer.dataset.memberId
                  // récupérer player id
                const addPlayerToRaceData = {
                  race_id: raceId,
                  player_id: playerId,
                  position: 0
                }
                fetch('/addPlayerToRace', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(addPlayerToRaceData)
                },
                 window.location = "/calendrier"
                )
                })
              }
            })
            $(addPlayerModal).modal('show')
          })
        }
      }),
    '/classement': () =>
      fetch('/courses')
      .then(res => res.json())
      .then(races => races.reduce((carry, race) => carry + makeClassement(race),''))
      .then(gpCard => render(
        `${navbar}
        <div class="container">
          <div class="jumbotron ImageClassement">
            <h1 class="display-3 titleClassement">Classement</h1>
            <p></p>
            <p><a class="btn btn-success btn-lg boutonAcceuilClassement" href="/" role="button">Accueil</a></p>
            </div>
            <div class="row">${gpCard}</div>
        </div>`)
    ),

    '/race/new': () => {
      render(`
          ${navbar}
          <div class="container">
            <div id="alert-box" class="hidden">
          </div>
          <h2>Création de la course</h2>
          <form id="add-race">
          <div class="form-group">
          <label for="inputdate">Date de la course (YYYY-MM-DD HH:MM:SS.SSS)</label>
            <input name="date" type="text" class="form-control" id="inputFirstName" placeholder="YYYY-MM-DD HH:MM:SS.SSS">
          </div>
          

          <button type="submit" class="btn btn-primary">Créer votre course</button>
        </form>
      </div>`
      )


      //js du formulaire création de course
      const form = document.getElementById('add-race')
      form.addEventListener('submit', e => {
        e.preventDefault()
        const data = serializeForm(form)
        fetch('/race', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })//appel cette fonction pour gérer les routes
        .then(res => res.json())
        .then(races => {
          const alertBox = document.getElementById('alert-box')
          alertBox.className = 'alert alert-success'
          alertBox.innerHTML += `Course créée`
         // alertBox.innerHTML += `\n Vous allez être redirigés vers la page d'acceuil`
        })
        window.setTimeout(() =>
        { window.location = "/"; },3000);
      })
    },
    
    '/members/new': () => {
      //construit le formulaire
      render(
      `${navbar}
      <div class="container">
        <div id="alert-box" class="hidden">
        </div>
        <h2>Inscription pour le tournoi !</h2>
        <form id="add-member">
          <div class="form-group">
            <label for="inputName">Prénom</label>
            <input name="name" type="text" class="form-control" id="inputFirstName" placeholder="Entrez votre prénom">
        </div>
        <div class="form-group">
          <label for="inputNickname">Pseudo</label>
          <input name="nickname" type="text" class="form-control" id="inputNickname" placeholder="Entrez votre pseudo">
        </div>
          <p>Choisissez votre équipe</br></p>
        <div class="form-check form-check-inline">
            <input class="form-check-input form-control"  type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
            <label class="form-check-label" for="inlineRadio1">TEAM WILD</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input form-control" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
            <label class="form-check-label" for="inlineRadio2">TEAM CAPSULE</label>
          </div>
          <div class="form-group">
          <label for="inputImageUrl">Image URL</label>
          <input name="image" type="text" class="form-control" id="inputImageUrl" placeholder="Enter image URL">
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input name="email" type="text" class="form-control" id="inputEmail" placeholder="Saisissez votre email">
        </div>
        <div class="form-group">
          <label for="inputPassword">Mot de passe</label>
          <input name="motDePasse" type="password" class="form-control" id="inputPassword" placeholder="Saisissez votre mot de passe">
        </div>
        <button type="submit" class="btn btn-primary">S'enregistrer</button>
      </form>
    </div>`
    )
    
    //js du formulaire
    const form = document.getElementById('add-member')
    form.addEventListener('submit', e => {
      e.preventDefault()
      const data = serializeForm(form)
      fetch('/members', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })//appel cette fonction pour gérer les routes
      .then(res => res.json())
      .then(members => {
        const alertBox = document.getElementById('alert-box')
        alertBox.className = 'alert alert-success'
        alertBox.innerHTML += `${members.name} est inscrit`
        alertBox.innerHTML += `\n Vous allez être redirigés vers la page d'acceuil`
      })
      window.setTimeout(() =>
      { window.location = "/"; },3000);
    })
  },
  '/information': () => render(
  `${navbar}
    <div class="container">
      <section class="jumbotron text-center">
        <h1 class="jumbotron-heading">A propos</h1>
        <p class="lead text-muted"> Ce site a pour vocation de pouvoir s'inscrire et disputer des tournois de Mario Kart sur Nintendo 64 entre amis. <br/>
        Nous sommes une équipe de 4 personnes unis par une passion commune : celle de pouvoir participer a des courses sur le jeu Mario Kart. <br/>
        Par l'intermédiaire de ce site nous vous proposons de participer à des tournois ponctuels et de venir vous mesurer sur ce jeu. Que vous soyez debutant ou confirmé, venez passer le temps d'une soirée un moment convivial dans une ambiance festive.   </p>
        <h4> Quelques mots sur le jeu</h4>
        <p>Mario Kart est sans doute le jeu de course le plus prisé des jeunes joueurs, avec ses courses endiablées, au rythme des carapaces qui volent et de la tension permanente de se voir voler la première place de la course au dernier moment. Débuté en 1992 avec Super Mario Kart sur Super Nintendo, la saga compte aujourd’hui son 8e opus, sorti en 2014 sur console Wii U.</p>
        <a class="btn btn-primary btn-lg" href="/" role="button">Accueil»</a>
      </section>
    </div>
    <div class="card-group mx-4">
      <div class="card mr-4">
        <img class="card-img-top img-fluid" src="https://emmanuelbouin.files.wordpress.com/2012/02/pitivier_content.jpg?w=586" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Khalid <3</h5>
          <p class="card-text">Power up preferé : Bananes</p>
          <p class="card-text"> Ce joueur excelle dans l'art de semer de petites bananes pour faire déraper les autres joueurs. Mefiez vous car si une trajectoire rapide est souvent prisé il y aura toujours une petite banane délicatement et amoureusement posée. </p>
        </div>
      </div>
      <div class="card mr-4">
        <img class="card-img-top" src="https://img2.finalfantasyxiv.com/f/5852ad62305be28222035bf6c2e9d2a5_40d57ba713628f3f1ef5ef204b6d76d2fl0_640x873.jpg?1512791378" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">aNa</h5>
          <p class="card-text">Power up preferé : Eclairs </p>
          <p class="card-text">Armée de ses fidèles éclairs, aNa n'hésitera pas à vous foudroyer pour pouvoir voler vers la premiere place. Elle restera calme et pacifiste... Tant qu'elle ne possede pas ses éclairs.</p>
        </div>
      </div>
      <div class="card mr-4">
        <img class="card-img-top" src="https://ae01.alicdn.com/kf/HTB14uRAQpXXXXX.XXXXq6xXFXXXa/Play-Arts-PA-Kai-Final-Fantasy-VII-FF7-Sephiroth-Action-Figure-PVC-Statue-25cm-high-no.jpg_640x640.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Antho</h5>
          <p class="card-text">Power up preferé : Carapaces rouges </p>
          <p class="card-text">Une, deux et trois carapaces rouges. Voila ce qu'il lui faut pour s'assurer la premiere place. Power up à la fois offensif et defensif, il comptera dessus pour vous regarder une fois qu'il aura franchi la ligne d'arrivé en premier.</p>
        </div>
      </div>
      <div class="card mr-4">
        <img class="card-img-top" src="https://img00.deviantart.net/c6f2/i/2008/087/f/b/foxhound_icon_by_solidalexei.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Dorian</h5>
          <p class="card-text">power up preferé : Etoile </p>
          <p class="card-text">Avec son etoile, ce joueur ira plus vite et sera invicible pour un temps limité. Toutefois ne vous approchez pas de lui ou vous risquez de perdre le controle. </p>
        </div>
      </div>
    </div>`
  ),

  '*': () => render('<h1>Not Found</h1>'),
}

const routing = () => {
  const routes = [
    '/',
    '/members/new',
    '/information',
    '/race/new',
    '/calendrier',
    '/classement',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}
//appel cette fonction pour gérer les routes
routing()
