const parseThumb = thumb => {
  const thumbUrl = thumb.querySelector('img').src
  const tags = thumb.querySelector('img').alt
  const postUrl = 'http://konachan.net/' + thumb.getAttribute('href')
  return { thumbUrl, tags, postUrl }
}

const getImageUrl = async postUrl => {
  const pageContents = await fetch(postUrl)
  const domParser = new DOMParser()
  const page = domParser.parseFromString(await pageContents.text(), 'text/html')
  const imageUrl = page.querySelector('.original-file-unchanged')
  if (imageUrl) {
    return imageUrl.getAttribute('href').replace('konachan.net', 'konachan.com')
  } else {
    return page
      .querySelector('.original-file-changed')
      .getAttribute('href')
      .replace('konachan.net', 'konachan.com')
  }
}

const contains = (doc, selector, text) => {
  var elements = doc.querySelectorAll(selector)
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent)
  })
}

export const getPageCount = page => {
  const lastPage = page.querySelector('.pagination > :nth-last-child(2)')
    .textContent
  if (!lastPage) {
    return null
  }
  return parseInt(lastPage, 10)
}

export const parsePage = async (query, page) => {
  let url = null
  if (query !== '') {
    url = `http://konachan.net/post?tags=${query}`
  } else {
    url = `http://safebooru.org/post?tags=`
  }
  if (page) {
    url = `${url}&page=${page.toString()}`
  }

  const pageContents = await fetch(url)
  const domParser = new DOMParser()
  return domParser.parseFromString(await pageContents.text(), 'text/html')
}

export const getThumbs = page => {
  const thumbs = Array.from(page.querySelectorAll('.thumb'))
  return thumbs.map(parseThumb)
}

export default { parsePage, getThumbs, getPageCount, getImageUrl }
