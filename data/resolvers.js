import dayjs from 'dayjs'
import { MongoClient, ObjectId } from 'mongodb'
import { generateCollections } from '../lib/resolvers'
import shardsConfig from '../shards.config'

const models = shardsConfig.models

const MONGO_URL = 'mongodb://localhost:27017/'

let collections

MongoClient.connect(MONGO_URL, (err, client) => {
  const db = client.db('shards')
  collections = generateCollections(models, db)
})

const resolvers = {
  Query: {
    getRealms() {
      return collections.realms.find().toArray()
    },
    async getRealm(_, { id }) {
      const record = await collections.realms.findOne(ObjectId(id))
      const createdAt = ObjectId(record._id).getTimestamp()
      return {
        ...record,
        createdAt
      }
    }
  },
  Mutation: {
    async createRealm(_, args) {
      args.updatedAt = dayjs().toISOString()
      const { ops: [first] } = await collections.realms.insertOne(args)
      return first
    },
    async updateRealm(_, { id, ...args }) {
      args.updatedAt = dayjs().toISOString()
      const { ops: [first] } = await collections.realms.updateOne({ _id: id }, { $set: args })
      return first
    }
  }
}

export default resolvers
