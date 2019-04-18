import { elementToObject } from './util'

const getPageCount = res =>
  Math.ceil(parseInt(res.querySelector('posts').getAttribute('count'), 10) / 24)

export const getPosts = async (query, page) =>
  fetch(`http://yande.re/post.xml?&page=${page}&limit=24&tags=${query}`)
    .then(res => res.text())
    .then(res => new DOMParser().parseFromString(res, 'text/xml'))
    .then(res => {
      return {
        pageCount: getPageCount(res),
        posts: Array.from(res.getElementsByTagName('post')).map(getPost)
      }
    })

const getPost = post => {
  const obj = elementToObject(post)
  const postUrl = `http://yande.re/post/show/${obj.id}`
  return {
    thumbUrl: obj.preview_url,
    tags: obj.tags,
    postUrl,
    imageUrl: obj.sample_url,
    source: 'yandere',
    sourceTitle: 'yande.re',
    needsHack: true
  }
}

export default { getPosts }
