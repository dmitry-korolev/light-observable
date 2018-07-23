import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { EMPTY } from '../empty'

describe('(Extra) empty', () => {
  commonTest(EMPTY)

  it('should return empty observable', () => {
    const o = EMPTY
    const observer = getTestObserver()

    o.subscribe(observer)

    expect(observer.next.mock.calls.length).toEqual(0)
    expect(observer.error.mock.calls.length).toEqual(0)
    expect(observer.complete.mock.calls.length).toEqual(1)
  })
})
