import { contains } from './util'

const parseThumb = thumb => {
  const tags = thumb.dataset.tags
  const postUrl =
    'https://rule34.paheal.net' +
    thumb.querySelector('.shm-thumb-link').getAttribute('href')
  const thumbUrl = thumb.querySelector('.shm-thumb-link img').src
  return { tags, postUrl, thumbUrl }
}

const getImageUrl = async postUrl => {
  console.log(postUrl)
  const pageContents = await fetch(postUrl)
  const domParser = new DOMParser()
  const page = domParser.parseFromString(await pageContents.text(), 'text/html')
  return contains(page, 'a', 'Image Only')[0].getAttribute('href')
}

export const getPageCount = page => {
  const lastPage = contains(page, 'a', 'Last')[0]
  if (!lastPage) {
    return null
  }
  return parseInt(lastPage.href.split('/').pop(), 10)
}

export const parsePage = async (query, page) => {
  let url = null
  if (query !== '') {
    url = `https://rule34.paheal.net/post/list/${query}/`
  } else {
    url = `https://rule34.paheal.net/post/list/`
  }
  if (page) {
    url = url + page.toString()
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
