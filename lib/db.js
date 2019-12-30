import { MongoClient } from 'mongodb'
import pluralize from 'pluralize'
import { getCapitalized } from './string'
import shardsConfig from '../shards.config'

const models = shardsConfig.models

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shards'

const client = MongoClient.connect(
  MONGO_URI,
  { useUnifiedTopology: true }
)

const generateCollections = db => {
  const collections = []
  Object.keys(models).forEach(model => {
    const pluralModel = pluralize.plural(model)
    const capitalizedPluralModel = getCapitalized(pluralModel)
    collections[pluralModel] = db.collection(capitalizedPluralModel)
  })
  return collections
}

export const getCollections = () => (
  client.then(client => {
    const db = client.db()
    return generateCollections(db)
  })
)
