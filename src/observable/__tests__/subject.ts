import { Observable } from '../../core/Observable'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
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

  describe('Behavior mode', () => {
    it('emits initial value', () => {
      const [stream, sink] = createSubject({ initial: 1 })
      const observer = getTestObserver()

      stream.subscribe(observer)

      expect(observer.next).toBeCalledWith(1)
    })

    it('saves and emits last emitted value', () => {
      const [stream, sink] = createSubject({ initial: 1 })
      const observer = getTestObserver()

      sink.next(2)
      stream.subscribe(observer)

      expect(observer.next).toBeCalledWith(2)
      expect(observer.next.mock.calls).toHaveLength(1)
    })

    it('emits last value and completes', () => {
      const [stream, sink] = createSubject({ initial: 1 })
      const observer = getTestObserver()

      sink.complete()
      stream.subscribe(observer)

      expect(observer.next).toBeCalledWith(1)
      expect(observer.complete).toBeCalled()
    })

    it('doesnt emit last value and errors', () => {
      const [stream, sink] = createSubject({ initial: 1 })
      const observer = getTestObserver()

      sink.error('error')
      stream.subscribe(observer)

      expect(observer.next).not.toBeCalled()
      expect(observer.error).toBeCalledWith('error')
    })
  })
})
