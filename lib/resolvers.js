import pluralize from 'pluralize'
import { getCapitalized } from './string'

export const generateCollections = (models, db) => {
  const collections = []
  Object.keys(models).forEach(model => {
    const pluralModel = pluralize.plural(model)
    const capitalizedPluralModel = getCapitalized(pluralModel)
    collections[pluralModel] = db.collection(capitalizedPluralModel)
  })
  return collections
}
