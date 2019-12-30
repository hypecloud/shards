import dayjs from 'dayjs'

const performValidation = (propertyName, value, validationFunction) => {
  if (!validationFunction) return
  const valueValid = validationFunction(value)
  if (!valueValid) throw new Error(`${propertyName} is invalid.`)
}

export default (collection, model) => {
  return async (_, args) => {
    const iterableProperties = Object.entries(model)
    iterableProperties.forEach(([propertyName, propertySettings]) => {
      if (propertySettings) {
        const propertyValue = args[propertyName]
        performValidation(propertyName, propertyValue, propertySettings.validation)
      }
    })
    args.updatedAt = dayjs().toISOString()
    const { ops: [first] } = await collection.insertOne(args)
    return first
  }
}
