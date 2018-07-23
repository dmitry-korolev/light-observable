import { commonTest } from '../../helpers/testHelpers/commonTest'
import { auditTime as auditTimeOperator } from '../../operators/auditTime'
import { auditTime } from '../auditTime'
import { createSubject } from '../index'
import { of } from '../of'

describe('(Extra) auditTime', () => {
  commonTest(auditTime(10, of(1)), auditTimeOperator(10)(of(1)), [])

  it('should throttle the source stream', () => {
    const [stream, sink] = createSubject()
    const result: any[] = []
    const throttledStream = auditTime(100, stream)

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
