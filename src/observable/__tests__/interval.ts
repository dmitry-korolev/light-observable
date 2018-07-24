import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { take } from '../../operators'
import { interval } from '../interval'

describe('(Extra) interval', () => {
  commonTest(interval(10).pipe(take(5)), undefined, [0, 1, 2, 3, 4])

  it('should emit periodically', () => {
    const observable = interval(50)
    const observer = getTestObserver()

    observable.subscribe(observer)
    expect(observer.next).not.toBeCalled()

    jest.runTimersToTime(50)
    expect(observer.next).toBeCalledWith(0)

    jest.runTimersToTime(50)
    expect(observer.next).toBeCalledWith(1)

    jest.runTimersToTime(50)
    expect(observer.next).toBeCalledWith(2)

    jest.runTimersToTime(50)
    expect(observer.next).toBeCalledWith(3)
  })

  it('should unsubscribe', () => {
    const observable = interval(50)
    const observer = getTestObserver()
    observable.subscribe(observer).unsubscribe()

    jest.runTimersToTime(50)
    expect(observer.next).not.toBeCalled()
  })
})
