import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { Observable } from '../../index'
import { timeout as timeoutOperator } from '../../operators/timeout'
import { of } from '../of'
import { timeout } from '../timeout'

describe('(Extra) timeout', () => {
  commonTest(timeout(50, of(1)), timeoutOperator(50)(of(1)), [1])

  it('should forward argument on next', () => {
    const o = timeout(100, of(1, 2))
    const observer = getTestObserver()

    o.subscribe(observer)

    jest.runTimersToTime(150)

    expect(observer.next.mock.calls).toEqual([[1], [2]])
    expect(observer.error).not.toBeCalled()
  })

  it('errors if a stream emits does not emit before timeout', () => {
    expect.assertions(2)
    const o = new Observable((observer) => {
      setTimeout(() => {
        observer.next(1)
        observer.complete()
      }, 200)
    }).pipe(timeoutOperator(100))

    o.subscribe({
      error(reason) {
        expect(reason).toBeDefined()
        expect(reason.message).toBe('Timeout has occurred')
      }
    })

    jest.runTimersToTime(150)
  })

  it('does not error if a stream completed before timeout', () => {
    const o = new Observable((observer) => {
      setTimeout(() => {
        observer.complete()
      }, 100)
    }).pipe(timeoutOperator(200))

    const obs = {
      complete: jest.fn(),
      error: jest.fn()
    }

    o.subscribe(obs)

    jest.runTimersToTime(300)

    expect(obs.error).not.toBeCalled()
    expect(obs.complete).toBeCalled()
  })

  it('does not error if a stream errored before timeout', () => {
    const o = new Observable((observer) => {
      setTimeout(() => {
        observer.error(new Error('Error from stream'))
      }, 100)
    }).pipe(timeoutOperator(200))

    let error: any

    const obs = {
      error: jest.fn((e) => (error = e))
    }

    o.subscribe(obs)

    jest.runTimersToTime(300)

    expect(obs.error).toBeCalled()
    expect(error.message).toBe('Error from stream')
  })
})
