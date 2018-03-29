const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const makeCard = member => {
  console.log(member)
}

const controllers = {
  '/': () => 
    fetch('/members')
    .then(res => res.json())
    .then(members => members.reduce((carry, member) => carry + makeCard(member))),
  '*': () => render('<h1>Not Found</h1>'),
}

const route = pathname => {
}

(() => {

  ['/', '*'].forEach(
    path => page(path, controllers[path])
  )
  page()
})()
