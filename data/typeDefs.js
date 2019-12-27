import { gql } from 'apollo-server-koa'
import { defineTypes, defineQueries, defineMutations } from '../lib/typedef'
import shardsConfig from '../shards.config'

const models = shardsConfig.models

const typeDefs = String([
  defineTypes(models),
  defineQueries(models),
  defineMutations(models)
].join(''))

console.log(typeDefs)

export default typeDefs
