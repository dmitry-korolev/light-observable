import { Observable } from '../../core/Observable'
import { getSpecies } from '../getSpecies'

describe('(Util) getSpecies', () => {
  it('should return constructor of an object', () => {
    expect(getSpecies(new Observable(() => undefined))).toBe(Observable)
    expect(getSpecies([])).toBe(Array)
  })

  it('should return Observable, if object has no constructor', () => {
    expect(getSpecies(Object.create(null))).toBe(Observable)
  })
})
