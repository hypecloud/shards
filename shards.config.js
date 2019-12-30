export default {
  models: {
    realm: {
      name: {
        type: 'String',
        defaultValue: 'IDK',
        validation: value => value.length > 3
      },
      slug: 'String!',
      posts: '[Post]'
    },
    post: {
      content: 'String!',
      realm: 'Realm!'
    }
  }
}
