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
  return { query, page }
}

export const getThumbs = page => {
  const thumbs
  return thumbs.map(parseThumb)
  return { thumbUrl, tags, postUrl }
}

export default { parsePage, getThumbs, getPageCount, getImageUrl }
