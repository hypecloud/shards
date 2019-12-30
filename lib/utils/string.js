export const getCapitalized = value => (
  value.charAt(0).toUpperCase() + value.substring(1)
)

export const startsWithCapitalLetter = value => (
  value[0] === getCapitalized(value)[0]
)
