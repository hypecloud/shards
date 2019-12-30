import pluralize from 'pluralize'
import { getCapitalized } from '../string'
import { getCollections } from '../../lib/db'
import shardsConfig from '../../shards.config'

const models = shardsConfig.models

import indexTemplate from './queries/index.template'
import getTemplate from './queries/get.template'
import createTemplate from './mutations/create.template'
import updateTemplate from './mutations/update.template'
import deleteTemplate from './mutations/delete.template'

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
    mutations[`create${capitalizedModel}`] = createTemplate(collection)
    mutations[`update${capitalizedModel}`] = updateTemplate(collection)
    mutations[`delete${capitalizedModel}`] = deleteTemplate(collection)
  }
  return mutations
}
