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

export const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(let el of elements) {
    data[el.name] = el.value
  }
  return data
}
