import { elementToObject } from './util'

const getPageCount = res =>
  Math.ceil(parseInt(res.querySelector('posts').getAttribute('count'), 10) / 24)

export const getPosts = async (query, page) =>
  fetch(
    `${process.env.REACT_APP_CORS_PROXY ||
      ''}http://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${page -
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
  const postUrl = `http://safebooru.org/index.php?page=post&s=view&id=${obj.id}`
  return {
    thumbUrl: `${process.env.REACT_APP_CORS_PROXY || ''}http:${
      obj.preview_url
    }`,
    tags: obj.tags,
    postUrl,
    imageUrl: `${process.env.REACT_APP_CORS_PROXY || ''}http:${obj.file_url}`,
    source: 'safebooru',
    sourceTitle: 'safebooru.org'
  }
}

export default { getPosts }
