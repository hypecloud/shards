let customConfig
try {
  customConfig =  require('../../../shards.config.js')
} catch {
  console.warn('[WARNING] No shards.config.js found. Using example config.')
}

const exampleConfig = {
  models: {
    realm: {
      name: {
        type: 'String',
        defaultValue: 'IDK',
        validation: value => value.length > 3
      },
      slug: {
        type: 'String!',
        validation: value => value.length > 3
      },
      posts: '[Post]'
    },
    post: {
      content: 'String!',
      realm: 'Realm!'
    }
  }
}

const config = customConfig ? customConfig.default : exampleConfig

console.log('conf', config)

export default config
