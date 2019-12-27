import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'

const PORT = 1337

import typeDefs from './data/typeDefs'
import resolvers from './data/resolvers'

const server = new ApolloServer({ typeDefs, resolvers: resolvers() })
const app = new Koa()
server.applyMiddleware({ app })
app.listen(PORT)
