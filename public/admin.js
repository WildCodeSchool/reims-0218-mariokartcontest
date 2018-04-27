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
            <input name="password" type="password" class="form-control" id="inputNickname">
          </div>
          <button type="submit" class="btn btn-primary">Connexion</button>
          <button type="button" class="btn btn-primary" id="disconnect">Déconnexion</button>
          </form>`)

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
          alert.innerHTML= `<div class="alert alert-danger" role="alert">
          Incorrect password or username
        </div>`
        } else {
          //store the token
          alert.innerHTML=`<div class="alert alert-success" role="alert">
                            Vous etes connecté. Have a nice day !!!
                          </div>`
          localStorage.setItem('token', data.token)
          logInForm.style.display= 'none'
          
          page('/', 300) // setting the path
          window.location= '/'
          
        }
      });
      
      
  });
  document.getElementById('disconnect').addEventListener('click', () => {
    const token = localStorage.getItem('token')
    console.log(token)
    fetch('test')
    .then(res => res.json())
    .catch(err => console.log(err))
    localStorage.removeItem('token')
    window.location= '/'
      page('/') // setting the path
      page() // starting the redirection
  })

}

export default admin