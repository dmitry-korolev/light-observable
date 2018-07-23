import { Observable } from '../../core/Observable'
import { createSubject } from '../subject'

describe('(Extra) subject', () => {
  it('should return a tuple of an observable and a sink', () => {
    const [stream, sink] = createSubject()

    expect(stream).toBeInstanceOf(Observable)
    expect(typeof sink.closed).toBe('boolean')
    expect(typeof sink.next).toBe('function')
    expect(typeof sink.error).toBe('function')
    expect(typeof sink.complete).toBe('function')
  })

  describe('closed', () => {
    it('returns false when the subject is open', () => {
      const [stream, sink] = createSubject()

      expect(sink.closed).toBe(false)
    })

    it('returns true when the subject is completed', () => {
      const [stream, sink] = createSubject()
      sink.complete()

      expect(sink.closed).toBe(true)
    })

    it('returns true when the subject is errored', () => {
      const [stream, sink] = createSubject()
      sink.error(new Error())

      expect(sink.closed).toBe(true)
    })
  })

  describe('next', () => {
    it('forwards the first argument', () => {
      const [stream, sink] = createSubject()

      let args
      stream.subscribe({
        next(...a: any[]) {
          args = a
        }
      })
      // @ts-ignore
      sink.next(1, 2)
      expect(args).toEqual([1])
    })

    it('does not forward when the subscription is complete', () => {
      const [stream, sink] = createSubject()

      let count = 0
      stream.subscribe({
        next() {
          count++
        }
      })
      sink.complete()
      sink.next(1)
      expect(count).toBe(0)
    })
  })

  describe('error', () => {
    it('forwards the argument', () => {
      const [stream, sink] = createSubject()
      let args
      stream.subscribe({
        error(...a: any[]) {
          args = a
        }
      })
      sink.error(1)
      expect(args).toEqual([1])
    })
  })

  describe('complete', () => {
    it('does not subscribe if subject is completed', () => {
      const [stream, sink] = createSubject()
      sink.complete()

      const subscription = stream.subscribe()
      expect(subscription.closed).toBe(true)
    })
  })
})
