import dayjs from 'dayjs'
import pluralize from 'pluralize'
import { ObjectId } from 'mongodb'
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

export const generateMutations = (models, collections) => {
  const mutations = {}
  Object.keys(models).forEach(model => {
    const pluralModel = pluralize.plural(model)
    const capitalizedModel = getCapitalized(model)
    mutations[`create${capitalizedModel}`] = async (_, args) => {
      args.updatedAt = dayjs().toISOString()
      const collection = (await collections)[pluralModel]
      const { ops: [first] } = await collection.insertOne(args)
      return first
    }
    mutations[`update${capitalizedModel}`] = async (_, { id, ...updateParams }) => {
      updateParams.updatedAt = dayjs().toISOString()
      const collection = (await collections)[pluralModel]
      const { value } = await collection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateParams },
        { returnOriginal: false }
      )
      return value
    }
    mutations[`delete${capitalizedModel}`] = async (_, { id }) => {
      const collection = (await collections)[pluralModel]
      const { value } = await collection.findOneAndDelete(
        { _id: ObjectId(id) }
      )
      return value
    }
  })
  return mutations
}
