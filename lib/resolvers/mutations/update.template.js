import dayjs from 'dayjs'
import { ObjectId } from 'mongodb'
import { performValidation } from '../../utils/mutations'

const beforeTransaction = (model, args) => {
  const iterableProperties = Object.entries(model)
  iterableProperties.forEach(([propertyName, propertySettings]) => {
    if (propertySettings) {
      const propertyValue = args[propertyName]
      performValidation(propertyName, propertyValue, propertySettings.validation)
    }
  })
}

export default (collection, model) => {
  return async (_, { id, ...updateParams }) => {
    beforeTransaction(model, updateParams)
    updateParams.updatedAt = dayjs().toISOString()
    const { value } = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateParams },
      { returnOriginal: false }
    )
    return value
  }
}
