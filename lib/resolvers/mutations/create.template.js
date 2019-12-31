import dayjs from 'dayjs'
import { performValidation, getPropertyValueOrDefault } from '../../utils/mutations'

const beforeTransaction = (model, args) => {
  const iterableProperties = Object.entries(model)
  iterableProperties.forEach(([propertyName, propertySettings]) => {
    if (propertySettings) {
      const propertyValue = args[propertyName]
      performValidation(propertyName, propertyValue, propertySettings.validation)
      args[propertyName] = getPropertyValueOrDefault(
        args[propertyName],
        propertySettings.defaultValue
      )
    }
  })
}

export default (collection, model) => {
  return async (_, args) => {
    beforeTransaction(model, args)
    args.updatedAt = dayjs().toISOString()
    const { ops: [first] } = await collection.insertOne(args)
    return first
  }
}
