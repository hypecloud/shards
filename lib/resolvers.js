import { ObjectId } from 'mongodb'
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

export const generateQueries = (models, collections) => {
  const queries = {}
  Object.keys(models).forEach(model => {
    const pluralModel = pluralize.plural(model)
    const capitalizedPluralModel = getCapitalized(pluralModel)
    const capitalizedModel = getCapitalized(model)
    queries[`get${capitalizedPluralModel}`] = async () => {
      const collection = (await collections)[pluralModel]
      return collection.find().toArray()
    }
    queries[`get${capitalizedModel}`] = async (_, { id }) => {
      const collection = (await collections)[pluralModel]
      const record = await collection.findOne(ObjectId(id))
      const createdAt = ObjectId(record._id).getTimestamp()
      return {
        ...record,
        createdAt
      }
    }
  })
  return queries
}
