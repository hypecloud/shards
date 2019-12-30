import { generateQueries, generateMutations } from '../lib/resolvers'

const getResolvers = async () => {
  return {
    Query: await generateQueries(),
    Mutation: await generateMutations()
  }
}

export default getResolvers
