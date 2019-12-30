import { getCapitalized } from '../../utils/string'
import pluralize from 'pluralize'

export default modelName => {
  const capitalizedModel = getCapitalized(modelName)
  const capitalizedPluralModel = pluralize.plural(capitalizedModel)
  return `get${capitalizedPluralModel}: [${capitalizedModel}]
    get${capitalizedModel}(id: String!): ${capitalizedModel}`
}
