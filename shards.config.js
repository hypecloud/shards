export default {
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
