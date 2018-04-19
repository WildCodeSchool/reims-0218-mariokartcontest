export const cleanHtml = htmlString =>htmlString
  .split('\n')
  .join('')
  .split(/>(\s*)</)
  .filter(str => str.trim())
  .join('><')
  .trim()
 