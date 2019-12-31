import { ValidationError } from 'apollo-server-koa'

export const performValidation = (propertyName, value, validationFunction) => {
  if (!validationFunction) return
  const valueValid = validationFunction(value)
  if (!valueValid) throw new ValidationError(`${propertyName} is invalid.`)
}

export const getPropertyValueOrDefault = (propertyValue, defaultValue) => {
  if (!defaultValue) return propertyValue
  const propertyPresent = propertyValue && propertyValue.length > 0
  return propertyPresent ? propertyValue : defaultValue
}
