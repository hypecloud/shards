import { getCollections } from '../lib/db'
import { generateQueries, generateMutations } from '../lib/resolvers'
import shardsConfig from '../shards.config'

const models = shardsConfig.models
const collections = getCollections(models)

const resolvers = () => {
  return {
    Query: generateQueries(models, collections),
    Mutation: generateMutations(models, collections)
  }
}

export default resolvers
