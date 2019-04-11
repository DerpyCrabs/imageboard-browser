import Paheal from './paheal'
import Safebooru from './safebooru'
export const getSource = source => {
  if (source === 'paheal') {
    return Paheal
  } else if (source === 'safebooru') {
    return Safebooru
  } else {
    return undefined
  }
}
