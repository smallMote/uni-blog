const fs = require('fs')
const path = require('path')
let mdSource = fs.readFileSync(path.resolve(__dirname, './mark-source.txt'), { encoding: 'utf-8' })
function splitPart(source) {
  source = source.match(/↵.*?↵/g)
  source = source.map(item => {
    return `<p>${item.replace(/↵/g, '')}</p>`
  })
  console.log(source)
  return source
}
function splitTitle(source) {
  let titles = source.match(/### .*?↵/g)
  titles = titles.map(item => {
    return `<h3>${item.replace(/#|↵|\s/g, '')}</h3>`
  })
  return titles
}
function splitCode(source) {
  source = source.match(/```.*?```/g)
  source = source.map(item => {
    let content = item.replace(/```javascript|```bash|```/g, '')
    content = item.replace(/↵/g, '\n')
    let clssName = /^```javascript/.test(item) ? 'js' : ''
    item = `<pre><code class="wx-code ${clssName}">${content}</code></pre>`
    return item
  })
  console.log(source)
}
function splitInlineCode(source) {
  source = source.match(/`.*?`/g)
  source = source.map(item => {
    if (!item.includes('↵')) {
      item = `<text class="inline-code">${item.replace(/`/g, '')}</text>`
    }
    return item
  })
  console.log(source)
  return source
}
// mdSource = splitTitle(mdSource)
// mdSource = splitPart(mdSource)
// console.log(mdSource)
// splitCode(mdSource)
splitInlineCode(mdSource)