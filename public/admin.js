import navbar from './navbar.js'
import { render } from './utils.js'
import { serializeForm } from './utils.js'

export const admin = 
() => {
  render(`${navbar}
  <div class="container">
    <div id="alert-login"></div>
  </div>
  <h2>Log In</h2>
  <form id="logInForm">
    <div class="form-group">
      <label for="inputName">Username</label>
      <input name="username" type="text" class="form-control" id="inputFirstName">
  </div>
  <div class="form-group">
    <label for="inputNickname">Password</label>
    <input name="password" type="text" class="form-control" id="inputNickname">
  </div>
  <button type="submit" class="btn btn-primary">Connexion</button>
  </form>
  <div id="test">Click me</div>`)

  const logInForm = document.getElementById('logInForm')
  logInForm.addEventListener('submit', e => {
    e.preventDefault()
      //data
      const data = serializeForm(logInForm)
       console.log(data)

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
          alert.innerHTML= `echec`
        } else {
          //store the token
          alert.innerHTML= `${data.user.username} est connecté`
          localStorage.setItem('token', data.token)
          logInForm.style.display= 'none'
        }
      });
  });
  document.getElementById('test').addEventListener('click', () => {
    const token = localStorage.getItem('token')
    console.log(token)
    fetch('test')
    .then(res => res.json())
    .catch(err => console.log(err))
  })
}

export default admin