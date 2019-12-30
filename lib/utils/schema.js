export const isTypeRequired = type => type[type.length - 1] === '!'

export const getIndent = (i, propertiesLength) => {
  const lastEntry = propertiesLength - 1
  if (i !== lastEntry) return '\n    '
  return ''
}

export const getPropertyType = property => {
  if (typeof property === 'string') {
    return property
  }
  if (typeof property === 'object') {
    if ('type' in property) return property.type
  }
  throw new Error('Property has no type')
}
