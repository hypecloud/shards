import { MongoClient } from 'mongodb'
import { generateCollections } from './resolvers'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shards'
let uriArray = MONGO_URI.split('/')
const DATABASE_NAME = uriArray.pop()
const CONNECTION_URL = uriArray.join('/')

const client = MongoClient.connect(
  CONNECTION_URL,
  { useUnifiedTopology: true }
)

export const getCollections = models => (
  client.then(client => {
    const db = client.db(DATABASE_NAME)
    return generateCollections(models, db)
  })
)
