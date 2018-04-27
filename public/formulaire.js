import navbar from './navbar.js'

export const formulaire = `
${navbar}
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

export default formulaire