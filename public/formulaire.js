import navbar from './navbar.js'
import { render } from './utils.js'
import { serializeForm } from './utils.js'

export const formulaire = () => {
  render(` ${navbar}
    <div class="container mt-4">
      <div id="alert-box" class="hidden"></div>
        <h2>Inscription pour le tournoi !</h2>
        <form id="add-member">
          <div class="form-group">
            <label for="inputName">Prenom</label>
            <input name="name" type="text" class="form-control" id="inputFirstName" placeholder="Entrez votre prenom" required />
          </div>
          <div class="form-group">
            <label for="inputNickname">Pseudo</label>
            <input name="nickname" type="text" class="form-control" id="inputNickname" placeholder="Entrez votre pseudo" required />
          </div>
          <p>Choisissez votre equipe</br></p>
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
            <input name="image" type="text" class="form-control" id="inputImageUrl" placeholder="Enter image URL" required />
          </div>
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input name="email" type="text" class="form-control" id="inputEmail" placeholder="Saisissez votre email" required />
          </div>
          <button type="submit" class="btn btn-primary buttonInscription">S'enregistrer</button>
        </form>
    </div>`)

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
            alertBox.innerHTML += `\n Vous allez etre rediriges vers la page d'accueil`
          })
     
      page('/listMembers')
      page()
    })
    }
  
    

export default formulaire
