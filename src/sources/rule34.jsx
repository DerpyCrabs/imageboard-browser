import { elementToObject } from './util'

const getPageCount = res =>
  Math.ceil(parseInt(res.querySelector('posts').getAttribute('count'), 10) / 24)

export const getPosts = async (query, page) =>
  fetch(
    `${process.env.REACT_APP_CORS_PROXY ||
      ''}https://rule34.xxx/index.php?page=dapi&s=post&q=index&pid=${page -
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
  const fileUrl = obj.file_url.replace('us.rule34.xxx', 'img.rule34.xxx')
  return {
    thumbUrl: obj.preview_url.replace('us.rule34.xxx', 'rule34.xxx'),
    tags: obj.tags,
    postUrl,
    imageUrl: [
      `${fileUrl.replace('rule34.xxx/', 'rule34.xxx//')}?${obj.id}`,
      `${fileUrl}?${obj.id}`,
      `${fileUrl.replace('rule34.xxx/', 'rule34.xxx//')}`,
      `${fileUrl}`
    ],
    source: 'rule34',
    sourceTitle: 'Rule34'
  }
}

export default { getPosts }
