export const getIndent = (i, propertiesLength) => {
  const lastEntry = propertiesLength - 1
  if (i !== lastEntry) return '\n    '
  return ''
}
