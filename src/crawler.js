const parse_thumb = thumb => {
  const tags = thumb.dataset.tags
  const postUrl =
    'https://rule34.paheal.net' +
    thumb.querySelector('.shm-thumb-link').getAttribute('href')
  const imageUrl = thumb.querySelector('a:not(.shm-thumb-link)').href
  const thumbUrl = thumb.querySelector('.shm-thumb-link img').src
  return { tags, postUrl, thumbUrl, imageUrl }
}

const contains = (doc, selector, text) => {
  var elements = doc.querySelectorAll(selector)
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent)
  })
}

export const get_page_count = page => {
  const lastPageHref = contains(page, 'a', 'Last')[0].href
  return parseInt(lastPageHref.split('/').pop(), 10)
}

export const parse_page = async url => {
  const page = await fetch(url)
  const domParser = new DOMParser()
  return domParser.parseFromString(await page.text(), 'text/html')
}

export const get_thumbs = page => {
  const thumbs = Array.from(page.querySelectorAll('.thumb'))
  return thumbs.map(parse_thumb)
}
