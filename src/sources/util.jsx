import Paheal from './paheal'
import Safebooru from './safebooru'
import Rule34 from './rule34'
import Yandere from './yandere'
import Konachan from './konachan'
export const getSource = source => {
  if (source === 'paheal') {
    return Paheal
  } else if (source === 'safebooru') {
    return Safebooru
  } else if (source === 'yandere') {
    return Yandere
  } else if (source === 'konachan') {
    return Konachan
  } else if (source === 'rule34') {
    return Rule34
  } else {
    return undefined
  }
}

export const contains = (doc, selector, text) => {
  var elements = doc.querySelectorAll(selector)
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent)
  })
}
