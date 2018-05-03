import navbar from './navbar.js'
import { render } from './utils.js'

export const information = () => {
  render(` 
  ${navbar}
  <div class="container mt-4">
    <section class="jumbotron text-center">
      <h1 class="jumbotron-heading">A propos</h1>
      <p class="lead text-muted"> Ce site a pour vocation de pouvoir s'inscrire et disputer des tournois de Mario Kart sur Nintendo 64 entre amis. <br/>
      Nous sommes une equipe de 4 personnes unis par une passion commune : celle de pouvoir participer a des courses sur le jeu Mario Kart. <br/>
      Par l'intermediaire de ce site nous vous proposons de participer a des tournois ponctuels et de venir vous mesurer sur ce jeu. Que vous soyez debutant ou expert, venez passer le temps d'une soiree un moment convivial dans une ambiance festive.</p>
      <h4> Quelques mots sur le jeu</h4>
      <p>Mario Kart est sans doute le jeu de course le plus connu des jeunes joueurs, avec ses courses folles, au rythme des carapaces qui volent et de la tension permanente de se voir voler la premiere place de la course au dernier moment. Debut de l'histoire en 1992 avec Super Mario Kart sur Super Nintendo, la saga compte aujourd’hui son 8e opus, sorti en 2014 sur console Wii U.</p>
    </section>
  </div>
  <div class="card-group mx-4 mb-3">
    <div class="card mr-4">
      <img class="card-img-top img-fluid" src="https://emmanuelbouin.files.wordpress.com/2012/02/pitivier_content.jpg?w=586" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Khalid <3</h5>
        <p>Power up prefere : Bananes</p>
        <p> Ce joueur excelle dans l'art de semer de petites bananes pour faire deraper les autres joueurs. Mefiez vous car si une trajectoire rapide est souvent prise il y aura toujours une petite banane delicatement et amoureusement posee.</p>
      </div>
    </div>
    <div class="card mr-4">
      <img class="card-img-top" src="https://img2.finalfantasyxiv.com/f/5852ad62305be28222035bf6c2e9d2a5_40d57ba713628f3f1ef5ef204b6d76d2fl0_640x873.jpg?1512791378" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Anahita</h5>
        <p>Power up prefere : Eclairs </p>
        <p>Armee de ses fideles eclairs, Anahita n'hesitera pas a vous foudroyer pour pouvoir voler vers la premiere place. Elle restera calme et pacifiste... Tant qu'elle ne possede pas ses eclairs.</p>
      </div>
    </div>
    <div class="card mr-4">
      <img class="card-img-top" src="https://ae01.alicdn.com/kf/HTB14uRAQpXXXXX.XXXXq6xXFXXXa/Play-Arts-PA-Kai-Final-Fantasy-VII-FF7-Sephiroth-Action-Figure-PVC-Statue-25cm-high-no.jpg_640x640.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Anthony</h5>
        <p>Power up prefere : Carapaces rouges </p>
        <p>Une, deux et trois carapaces rouges. Voila ce qu'il lui faut pour s'assurer la premiere place. Power up a la fois offensif et defensif, il comptera dessus pour vous regarder une fois qu'il aura franchi la ligne d'arrivee en premier.</p>
      </div>
    </div>
    <div class="card mr-4">
      <img class="card-img-top" src="https://img00.deviantart.net/c6f2/i/2008/087/f/b/foxhound_icon_by_solidalexei.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Dorian</h5>
        <p>power up prefere : Etoile </p>
        <p>Avec son etoile, ce joueur ira plus vite et sera invicible pour un temps limite. Toutefois ne vous approchez pas de lui ou vous risquez de perdre le controle. </p>
      </div>
    </div>
  </div>`
  )
}

export default information
