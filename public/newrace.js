import navbar from './navbar.js'
import { render } from './utils.js'
import { serializeForm } from './utils.js'

export const newRace = () => {
  render(`
      ${navbar}
      <div class="container mt-4">
        <div id="alert-box" class="hidden">
      </div>
      <h2>Création de la course</h2>
      <form id="add-race">
      <div class="form-group">
      <label for="inputdate">Date de la course (YYYY-MM-DD HH:MM:SS.SSS)</label>
        <input name="date" type="text" class="form-control" id="inputFirstName" placeholder="YYYY-MM-DD HH:MM:SS.SSS">
      </div>
      <button type="submit" class="btn btn-primary buttonInscription">Créer votre course</button>
    </form>
  </div>
  `
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
}

export default newRace
