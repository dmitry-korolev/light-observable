import { Observable } from '../../core/Observable'
import { auditTime } from '../../operators/auditTime'
import { createSubject } from '../index'
import { of } from '../of'

jest.useFakeTimers()

describe('(Operator) auditTime', () => {
  it('should return Observable', () => {
    const o = auditTime(100)(of(1))

    expect(o).toBeInstanceOf(Observable)
  })

  it('should throttle the source stream', () => {
    const [stream, sink] = createSubject()
    const result: any[] = []
    const throttledStream = stream.pipe(auditTime(100))

    throttledStream.subscribe((x) => result.push(x))

    sink.next(1)
    expect(result).toEqual([])

    jest.runTimersToTime(100)
    expect(result).toEqual([1])

    sink.next(2)
    sink.next(3)
    jest.runTimersToTime(100)
    expect(result).toEqual([1, 3])
  })
})
