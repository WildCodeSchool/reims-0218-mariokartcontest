import navbar from './navbar.js'
import calendrier from './calendrier.js';
import formulaire from './formulaire.js'
import admin from './admin.js'
import contestant from './contestant.js'
import newRace from './newrace.js'
import information from './information.js'
import classementRoute  from './classementroute.js';

const controllers = {
  
  '/': contestant,

  '/calendrier': calendrier,

  '/classement': classementRoute,

  '/race/new': newRace,

  '/admin': admin,
  
  '/members/new': formulaire,
  
  '/information': information,

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
    '/admin',
    '*'
  ]
  routes.forEach(
    path => page(path, controllers[path])
  )
  page()
}
//appel cette fonction pour gérer les routes
routing()
