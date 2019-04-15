import Paheal from './paheal'
import Safebooru from './safebooru'
import Rule34 from './rule34'
import Yandere from './yandere'
import Konachan from './konachan'

export const elementToObject = element =>
  Array.from(element.attributes).reduce((obj, attr) => {
    obj[attr.name] = attr.value
    return obj
  }, {})

const zip = (a, b) => {
  return a.map((e, i) => [e, b[i]])
}
export const getSource = source => {
  if (source.includes('-')) {
    const sources = source.split('-')
    const parsePage = async (query, page) => {
      let pages = []
      for (source of sources) {
        pages.push({
          source,
          page: await getSource(source).parsePage(query, page)
        })
      }
      return pages
    }
    const getPageCount = pages => {
      return Math.max(
        ...pages.map(({ source, page }) => getSource(source).getPageCount(page))
      )
    }
    const getThumbs = pages => {
      return pages
        .map(({ source, page }) => getSource(source).getThumbs(page))
        .flat()
    }
    const getImageUrl = postUrl => {
      return getSource(
        sources.find(source => postUrl.includes(source))
      ).getImageUrl(postUrl)
    }
    return {
      parsePage,
      getPageCount,
      getThumbs,
      getImageUrl
    }
  } else {
    if (source === 'safebooru') {
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
}

export const contains = (doc, selector, text) => {
  var elements = doc.querySelectorAll(selector)
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent)
  })
}
