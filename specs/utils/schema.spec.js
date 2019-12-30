import { getIndent } from '../../lib/utils/schema'

describe('getIndent', () => {
  it('returns new line indent if it is not last line', () => {
    expect(getIndent(1, 3)).toEqual('\n    ')
  })

  it('returns no indent if it is last line', () => {
    expect(getIndent(2, 3)).toEqual('')
  })
})
