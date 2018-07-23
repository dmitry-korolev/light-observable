import { commonTest } from '../../helpers/testHelpers/commonTest'
import { skipRepeats as skipRepeatsOperator } from '../../operators/skipRepeats'
import { of } from '../of'
import { skipRepeats } from '../skipRepeats'
import { createSubject } from '../subject'

describe('(Extra) skipRepeats', () => {
  commonTest(skipRepeats(undefined, of(1, 1, 2, 2, 3)), skipRepeatsOperator()(of(1, 1, 2, 2, 3)), [
    1,
    2,
    3
  ])

  describe('given compare function', () => {
    test('always equals', () => {
      const [stream, sink] = createSubject()
      const o = stream.pipe(skipRepeatsOperator(() => true))
      const result: any[] = []
      o.subscribe((x) => result.push(x))

      sink.next(1)
      sink.next(1)
      sink.next(2)
      sink.next(2)
      sink.next(3)
      sink.next(3)

      expect(result).toEqual([1])
    })

    test('never equals', () => {
      const [stream, sink] = createSubject()
      const o = stream.pipe(skipRepeatsOperator(() => false))
      const result: any[] = []
      o.subscribe((x) => result.push(x))

      sink.next(1)
      sink.next(1)
      sink.next(2)
      sink.next(2)
      sink.next(3)
      sink.next(3)

      expect(result).toEqual([1, 1, 2, 2, 3, 3])
    })

    test('deep compare', () => {
      const [stream, sink] = createSubject()
      const o = stream.pipe(
        skipRepeatsOperator<any>((a, b) => {
          const keysA = Object.keys(a)
          const keysB = Object.keys(b)

          if (keysA.length !== keysB.length) {
            return false
          }

          for (const key of keysA) {
            if (!b[key] || a[key] !== b[key]) {
              return false
            }
          }

          return true
        })
      )
      const result: any[] = []
      o.subscribe((x) => result.push(x))

      const stateA = {
        a: {},
        b: {},
        c: {}
      }

      sink.next(stateA)
      sink.next(stateA)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(stateA)

      const stateB = {
        ...stateA,
        d: {}
      }

      sink.next(stateB)
      sink.next(stateB)
      sink.next(stateA)

      expect(result.length).toBe(3)
      expect(result[1]).toBe(stateB)
      expect(result[2]).toBe(stateA)

      const stateC = {
        ...stateA,
        a: {}
      }

      sink.next(stateC)

      expect(result.length).toBe(4)
      expect(result[3]).toBe(stateC)
    })
  })
})
