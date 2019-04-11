import Paheal from './paheal'
import Safebooru from './safebooru'
import Rule34 from './rule34'
export const getSource = source => {
  if (source === 'paheal') {
    return Paheal
  } else if (source === 'safebooru') {
    return Safebooru
  } else if (source === 'rule34') {
    return Rule34
  } else {
    return undefined
  }
}
