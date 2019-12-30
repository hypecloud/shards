import { getCapitalized } from '../../utils/string'

export default (modelName, properties) => {
  const capitalizedModel = getCapitalized(modelName)
  const propertiesArray = Object.entries(properties)
  const baseParams = propertiesArray.map(([propertyName, type]) => `${propertyName}: ${type}`).join(', ')
  return `create${capitalizedModel}(${baseParams}): ${capitalizedModel}
    update${capitalizedModel}(id: String!, ${baseParams}): ${capitalizedModel}
    delete${capitalizedModel}(id: String!): ${capitalizedModel}`
}
