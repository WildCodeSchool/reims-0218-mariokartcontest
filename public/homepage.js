import { render } from './utils.js'

export const homepage = () => {
  render( `
    <div class="jumbotron jumbotron-fluid homepage">
      <img class="img-fluid" src="image/Mario-Kart-64-logo-m.png" alt=""  />
      <img src="https://raw.githubusercontent.com/iamshaunjp/css-animations-playlist/master/mario-examples/img/cloud.png" alt="" class="cloud" />
      <img src="https://raw.githubusercontent.com/iamshaunjp/css-animations-playlist/master/mario-examples/img/cloud.png" alt="" class="cloud" />
    </div>
    <div class="grass">
      <div class="road">
        <div class="lines"></div>
          <img src="https://openclipart.org/image/2400px/svg_to_png/198281/mono-point.png"  class="point"/>
          <img src="image/200.gif" alt="" class="drapeau" />
          <img src="image/5.gif" alt="" class="luigi" />
          <img src="image/1.gif" alt="" class="mario" />
          <img src="image/4.gif" alt="" class="peach" />
          <img src="image/21.gif" alt="" class="toadette" />
        </div>  
      </div>
      <div class="jumbotron jumbotron-fluid intro">
        <div class="container">
          <p class="lead mb-0 pb-0">Tu es membre de la Capsule?</p>
          <p class="lead mb-0 pb-0">Tu connais Mario Kart 64?</p>
          <p class="lead mb-0 pb-0">Et en plus, tu te prends pour le meilleur ??</p>
          <p class="lead mb-0 pb-0">Alors inscris-toi au tournoi Mario Kart de la Wild Code School et viens jouer face a nos Champions !</p>
          <a role"button" href="/listMembers" class="btn btn-primary btn-lg btn-block">J'accepte le challenge</a>
        </div>
      </div>
    </div>
  `)
}

    export default homepage
    