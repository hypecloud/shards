import { MongoClient } from 'mongodb'
import { generateCollections } from './resolvers'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shards'
const DATABASE_NAME = MONGO_URI.split('/').pop()

const client = MongoClient.connect(
  MONGO_URI,
  { useUnifiedTopology: true }
)

export const getCollections = models => (
  client.then(client => {
    const db = client.db(DATABASE_NAME)
    return generateCollections(models, db)
  })
)
