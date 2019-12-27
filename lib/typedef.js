import pluralize from 'pluralize'
import { getCapitalized } from './string'

const scalars = `
  scalar DateTime
`

const buildTypeTemplate = (modelName, properties) => `
  type ${getCapitalized(modelName)} {
    _id: String!
    ${properties}
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

const buildQueriesTemplate = modelName => {
  const capitalizedModel = getCapitalized(modelName)
  const capitalizedPluralModel = pluralize.plural(capitalizedModel)
  return `get${capitalizedPluralModel}: [${capitalizedModel}]
    get${capitalizedModel}(id: String!): ${capitalizedModel}`
}

const buildMutationsTemplate = (modelName, properties) => {
  const capitalizedModel = getCapitalized(modelName)
  const propertiesArray = Object.entries(properties)
  const baseParams = propertiesArray.map(([propertyName, type]) => `${propertyName}: ${type}`).join(', ')
  return `create${capitalizedModel}(${baseParams}): ${capitalizedModel}
    update${capitalizedModel}(id: String!, ${baseParams}): ${capitalizedModel}
    delete${capitalizedModel}(id: String!): ${capitalizedModel}`
}

const getIndent = (i, propertiesLength) => {
  const lastEntry = propertiesLength - 1
  if (i !== lastEntry) return '\n    '
  return ''
}

const getTypeDef = (modelName, propertiesArray) => {
  return buildTypeTemplate(modelName,
    propertiesArray.map((property, i) => {
      const indent = getIndent(i, propertiesArray.length)
      const [propertyName, type] = property
      return `${propertyName}: ${type}${indent}`
    }).join('') // To get rid of ,
  )
}

export const defineTypes = models => {
  let types = scalars
  for (let [modelName, properties] of Object.entries(models)) {
    const propertiesArray = Object.entries(properties)
    types = String([
      types,
      getTypeDef(modelName, propertiesArray)
    ].join(''))
  }
  return types
}

export const defineQueries = models => `
  type Query {
    ${Object.entries(models).map(([modelName]) => (
      buildQueriesTemplate(modelName)
    )).join('\n    ')}
  }
`

export const defineMutations = models => `
  type Mutation {
    ${Object.entries(models).map(([modelName, properties]) => (
      buildMutationsTemplate(modelName, properties)
    )).join('\n    ')}
  }
`
