import { getCapitalized, startsWithCapitalLetter } from '../../utils/string'
import { isTypeRequired, getPropertyType } from '../../utils/schema'
import { BASIC_TYPES } from '../../constants/schema'

const checkIfArrayType = name => name[0] !== '[' && name[name.length - 1] !== ']'

const filterArrayTypes = properties => {
  return properties.filter(([_, type]) => checkIfArrayType(getPropertyType(type)))
}

const setRelationsInputTypes = properties => properties.map(property => {
  const [propertyName, type] = property
  const extendedType = getPropertyType(type)
  if (BASIC_TYPES.includes(extendedType)) return property
  if (!startsWithCapitalLetter(extendedType)) return property
  const relationInputProperty = `${propertyName}Id`
  const relationType = `String${isTypeRequired(extendedType) ? '!' : ''}`
  return [relationInputProperty, relationType]
})

const getBaseParams = propertiesArray => {
  const filteredProperties = filterArrayTypes(propertiesArray)
  const propertiesWithInputTypes = setRelationsInputTypes(filteredProperties)
  return propertiesWithInputTypes.map(([propertyName, type]) => {
    const extendedType = getPropertyType(type)
    return `${propertyName}: ${extendedType}`
  }).join(', ')
}

export default (modelName, properties) => {
  const capitalizedModel = getCapitalized(modelName)
  const propertiesArray = Object.entries(properties)
  const baseParams = getBaseParams(propertiesArray)
  return `create${capitalizedModel}(${baseParams}): ${capitalizedModel}
    update${capitalizedModel}(id: String!, ${baseParams}): ${capitalizedModel}
    delete${capitalizedModel}(id: String!): ${capitalizedModel}`
}
