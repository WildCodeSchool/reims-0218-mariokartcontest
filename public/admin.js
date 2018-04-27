import navbar from './navbar.js'

export const admin = `
${navbar}
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
  <div id="test">Click me</div>
`

export default admin