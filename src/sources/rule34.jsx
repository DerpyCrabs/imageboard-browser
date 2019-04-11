const parseThumb = thumb => {
  const thumbUrl = thumb.querySelector('img').src
  const tags = thumb.querySelector('img').alt
  const postUrl =
    'https://rule34.xxx/' + thumb.querySelector('a').getAttribute('href')
  return { thumbUrl, tags, postUrl }
}

const getImageUrl = async postUrl => {
  const pageContents = await fetch(postUrl)
  const domParser = new DOMParser()
  const page = domParser.parseFromString(await pageContents.text(), 'text/html')
  const imageUrl = contains(page, 'a', 'Original image')[0].getAttribute('href')
  const imageContents = await fetch(imageUrl)
  if (imageContents.redirected) {
    const imageUrl2 = imageUrl.replace('xxx//', 'xxx/')
    const imageContents2 = await fetch(imageUrl2)
    if (imageContents2.redirected) {
      return page.querySelector('#image').src
    } else {
      return imageUrl2
    }
  } else {
    return imageUrl
  }
}

const contains = (doc, selector, text) => {
  var elements = doc.querySelectorAll(selector)
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent)
  })
}

export const getPageCount = page => {
  const lastPage = page.querySelector('a[alt="last page"]')
  if (!lastPage) {
    return null
  }
  const pid = /&pid=(\d+)/g
  return parseInt(pid.exec(lastPage)[1], 10) / 42 + 1
}

export const parsePage = async (query, page) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.xxx/index.php?page=post&s=list&tags=${query}`
  } else {
    url = `https://rule34.xxx/index.php?page=post&s=list`
  }
  if (page) {
    url = `${url}&pid=${(42 * (page - 1)).toString()}`
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
