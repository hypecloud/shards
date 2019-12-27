import { MongoClient } from 'mongodb'
import { generateCollections } from './resolvers'

const MONGO_URL = 'mongodb://localhost:27017/'

const client = MongoClient.connect(
  MONGO_URL,
  { useUnifiedTopology: true }
)

export const getCollections = models => (
  client.then(client => {
    const db = client.db('shards')
    return generateCollections(models, db)
  })
)
