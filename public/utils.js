export const cleanHtml = htmlString =>htmlString
  .split('\n')
  .join('')
  .split(/>(\s*)</)
  .filter(str => str.trim())
  .join('><')
  .trim()

  export const tokenAdmin = () => localStorage.getItem('token')

const mainDiv = document.getElementById('main')


export const render = html => {
    mainDiv.innerHTML = html
  }