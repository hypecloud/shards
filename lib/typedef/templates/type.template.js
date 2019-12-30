import { getCapitalized } from '../../utils/string'

export default (modelName, properties) => `
  type ${getCapitalized(modelName)} {
    _id: String!
    ${properties}
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
