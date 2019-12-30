import { getCapitalized } from '../../lib/utils/string'

describe('getCapitalized', () => {
  it('does not change anything', () => {
    expect(getCapitalized('0hards')).toEqual('0hards')
    expect(getCapitalized('Shards')).toEqual('Shards')
  })

  it('returns correct, capitalized string', () => {
    expect(getCapitalized('shards')).toEqual('Shards')
  })
})
