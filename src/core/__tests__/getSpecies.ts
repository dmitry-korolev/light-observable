import { getSpecies } from '../../helpers/getSpecies'
import { Observable } from '../Observable'

describe('getSpecies', () => {
  it('should return constructor of an object', () => {
    expect(getSpecies(new Observable(() => undefined))).toBe(Observable)
    expect(getSpecies([])).toBe(Array)
  })

  it('should return Observable, if object has no constructor', () => {
    expect(getSpecies(Object.create(null))).toBe(Observable)
  })
})
