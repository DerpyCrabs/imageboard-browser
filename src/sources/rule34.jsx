import { elementToObject } from './util'

const getPageCount = res =>
  Math.ceil(parseInt(res.querySelector('posts').getAttribute('count'), 10) / 24)

export const getPosts = async (query, page) =>
  fetch(
    `https://rule34.xxx/index.php?page=dapi&s=post&q=index&pid=${page -
      1}&limit=24&tags=${query}`
  )
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
  const postUrl = `https://rule34.xxx/index.php?page=post&s=view&id=${obj.id}`
  return {
    thumbUrl: obj.preview_url,
    tags: obj.tags,
    postUrl,
    imageUrl: obj.file_url,
    source: 'rule34',
    sourceTitle: 'Rule34'
  }
}

export default { getPosts }
