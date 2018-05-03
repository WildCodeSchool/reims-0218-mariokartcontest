import navbar from './navbar.js'
import { render } from './utils.js'
import { serializeForm } from './utils.js'

export const admin = () => {
  render(`${navbar}
    <div class="container mt-4">
      <div id="alert-login"></div>
      <h2>Log In</h2>
      <form id="logInForm">
        <div class="form-group">
          <label for="inputName">Username</label>
          <input name="username" type="text" class="form-control" id="inputFirstName">
        </div>
        <div class="form-group">
          <label for="inputNickname">Password</label>
          <input name="password" type="password" class="form-control" id="inputNickname">
        </div>
      <button type="submit" class="btn btn-primary">Connexion</button>
      <button type="button" class="btn btn-primary" id="disconnect">Déconnexion</button>
      </form>
    </div>
  `)

  const logInForm = document.getElementById('logInForm')
  logInForm.addEventListener('submit', e => {
    e.preventDefault()
      //data
      const data = serializeForm(logInForm)
      //POST sur le serveur /auth/login
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        const alert = document.getElementById('alert-login')
        if(!data.user) {
          //alert class danger
          alert.innerHTML=`<div class="alert alert-danger" role="alert">Incorrect password or username</div>`
        } else {
          //store the token
          alert.innerHTML=`<div class="alert alert-success" role="alert">Vous etes connecté. Have a nice day !!!</div>`
          localStorage.setItem('token', data.token)
          logInForm.style.display= 'none'
          page('/listMembers')
          page()
          
        }
      });   
  });
  document.getElementById('disconnect').addEventListener('click', () => {
    const token = localStorage.getItem('token')
    fetch('test')
    .then(res => res.json())
    .catch(err => console.log(err))
    localStorage.removeItem('token')
      page('/listMembers') // setting the path
      page() // starting the redirection
  })
}

export default admin
