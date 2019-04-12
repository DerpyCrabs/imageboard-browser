import { contains } from './util'

const parseThumb = thumb => {
  const thumbUrl = thumb.querySelector('img').src
  const tags = thumb.querySelector('img').alt
  const postUrl =
    'http://safebooru.org/' + thumb.querySelector('a').getAttribute('href')
  return { thumbUrl, tags, postUrl }
}

const getImageUrl = async postUrl => {
  const pageContents = await fetch(postUrl)
  const domParser = new DOMParser()
  const page = domParser.parseFromString(await pageContents.text(), 'text/html')
  return 'http:' + contains(page, 'a', 'Original image')[0].getAttribute('href')
}

export const getPageCount = page => {
  const lastPage = page.querySelector('a[alt="last page"]')
  if (!lastPage) {
    return null
  }
  const pid = /&pid=(\d+)/g
  return parseInt(pid.exec(lastPage)[1], 10) / 40 + 1
}

export const parsePage = async (query, page) => {
  let url = null
  if (query !== '') {
    url = `http://safebooru.org/index.php?page=post&s=list&tags=${query}`
  } else {
    url = `http://safebooru.org/index.php?page=post&s=list`
  }
  if (page) {
    url = `${url}&pid=${(40 * (page - 1)).toString()}`
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
