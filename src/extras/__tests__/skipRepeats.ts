import { pipe } from '../pipe'
import { skipRepeats } from '../skipRepeats'
import { createSubject } from '../subject'

describe('(Observable) skipRepeats', () => {
  it('filters same values', () => {
    const [stream, sink] = createSubject()
    const o = pipe(skipRepeats())(stream)
    const result: any[] = []
    o.subscribe((x) => result.push(x))

    sink.next(1)
    sink.next(1)
    sink.next(1)

    expect(result).toEqual([1])

    sink.next(2)
    sink.next(2)
    sink.next(3)
    sink.next(3)

    expect(result).toEqual([1, 2, 3])
  })

  describe('providing compare function', () => {
    test('always equals', () => {
      const [stream, sink] = createSubject()
      const o = pipe(skipRepeats(() => true))(stream)
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
      const o = pipe(skipRepeats(() => false))(stream)
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
      const o = pipe(
        skipRepeats<any>((a, b) => {
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
      )(stream)
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
