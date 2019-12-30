import dayjs from 'dayjs'

export default (collection, propertiesWithDefaultValue) => {
  return async (_, args) => {
    if (propertiesWithDefaultValue) {
      propertiesWithDefaultValue.forEach(([propertyName, definitions]) => {
        const propertyHasValue = args[propertyName] && args[propertyName].length > 0
        if (!propertyHasValue) args[propertyName] = definitions.defaultValue
      })
    }
    args.updatedAt = dayjs().toISOString()
    const { ops: [first] } = await collection.insertOne(args)
    return first
  }
}
