import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { empty, EMPTY } from '../empty'

describe('(Extra) empty', () => {
  commonTest(EMPTY, empty())

  describe('EMPTY', () => {
    it('should represent an empty observable', () => {
      const o = EMPTY
      const observer = getTestObserver()

      o.subscribe(observer)

      expect(observer.next.mock.calls.length).toEqual(0)
      expect(observer.error.mock.calls.length).toEqual(0)
      expect(observer.complete.mock.calls.length).toEqual(1)
    })
  })

  describe('empty', () => {
    it('should return an empty observable', () => {
      const o = empty()
      const observer = getTestObserver()

      o.subscribe(observer)

      expect(observer.next.mock.calls.length).toEqual(0)
      expect(observer.error.mock.calls.length).toEqual(0)
      expect(observer.complete.mock.calls.length).toEqual(1)
    })
  })
})
