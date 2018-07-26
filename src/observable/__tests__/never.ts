import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { NEVER, never } from '../never'

describe('(Extra) never', () => {
  commonTest(never(), NEVER)

  describe('NEVER', () => {
    it('should represent an observable that does nothing', () => {
      const o = NEVER
      const observer = getTestObserver()

      o.subscribe(observer)

      expect(observer.next.mock.calls.length).toEqual(0)
      expect(observer.error.mock.calls.length).toEqual(0)
      expect(observer.complete.mock.calls.length).toEqual(0)
    })
  })

  describe('never', () => {
    it('should return an observable that does nothing', () => {
      const o = never()
      const observer = getTestObserver()

      o.subscribe(observer)

      expect(observer.next.mock.calls.length).toEqual(0)
      expect(observer.error.mock.calls.length).toEqual(0)
      expect(observer.complete.mock.calls.length).toEqual(0)
    })
  })
})
