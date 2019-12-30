import { getIndent } from '../utils/schema'

import {
  scalarsTemplate,
  typeTemplate,
  queriesTemplate,
  mutationsTemplate
} from './templates'

const getTypeDef = (modelName, propertiesArray) => {
  return typeTemplate(modelName,
    propertiesArray.map((property, i) => {
      const indent = getIndent(i, propertiesArray.length)
      const [propertyName, type] = property
      return `${propertyName}: ${type}${indent}`
    }).join('') // To get rid of ,
  )
}

export const defineTypes = models => {
  let types = scalarsTemplate
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
  queriesTemplate(modelName)
)).join('\n    ')}
  }
`

export const defineMutations = models => `
  type Mutation {
    ${Object.entries(models).map(([modelName, properties]) => (
  mutationsTemplate(modelName, properties)
)).join('\n    ')}
  }
`
