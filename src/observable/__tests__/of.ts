import { of } from '../of'

describe('(Observable) of', () => {
  it('delivers arguments', () => {
    const values: number[] = []
    of(1, 2, 3, 4).subscribe((v) => values.push(v))
    expect(values).toEqual([1, 2, 3, 4])
  })
})
