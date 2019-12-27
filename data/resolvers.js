import dayjs from 'dayjs'
import { MongoClient, ObjectId } from 'mongodb'
import { getCollections } from '../lib/db'
import { generateCollections, generateQueries } from '../lib/resolvers'
import shardsConfig from '../shards.config'

const models = shardsConfig.models

const collections = getCollections(models)
console.log(collections)

const resolvers = () => {
  return {
    Query: generateQueries(models, collections),
    Mutation: {
      async createRealm(_, args) {
        args.updatedAt = dayjs().toISOString()
        const { ops: [first] } = await collections.realms.insertOne(args)
        return first
      },
      async updateRealm(_, { id, ...updateParams }) {
        updateParams.updatedAt = dayjs().toISOString()
        const { value } = await collections.realms.findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: updateParams },
          { returnOriginal: false }
        )
        return value
      }
    }
  }
}

console.log('res', resolvers())

export default resolvers
