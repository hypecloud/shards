import pluralize from 'pluralize'
import { getCapitalized } from '../utils/string'
import { getCollections } from '../../lib/db'
import shardsConfig from '../../shards.config'

const models = shardsConfig.models

import { getTemplate, indexTemplate } from './queries'
import {
  createTemplate,
  updateTemplate,
  deleteTemplate
} from './mutations'

export const generateQueries = async () => {
  const queries = {}
  const modelsKeys = Object.keys(models)
  for (const model of modelsKeys) {
    const capitalizedModel = getCapitalized(model)
    const pluralModel = pluralize.plural(model)
    const capitalizedPluralModel = getCapitalized(pluralModel)
    const collection = (await getCollections())[pluralModel]
    queries[`get${capitalizedPluralModel}`] = indexTemplate(collection)
    queries[`get${capitalizedModel}`] = getTemplate(collection)
  }
  return queries
}

export const generateMutations = async () => {
  const mutations = {}
  const modelsKeys = Object.keys(models)
  for (const model of modelsKeys) {
    const pluralModel = pluralize.plural(model)
    const capitalizedModel = getCapitalized(model)
    const collection = (await getCollections())[pluralModel]
    mutations[`create${capitalizedModel}`] = createTemplate(collection, models[model])
    mutations[`update${capitalizedModel}`] = updateTemplate(collection, models[model])
    mutations[`delete${capitalizedModel}`] = deleteTemplate(collection)
  }
  return mutations
}
