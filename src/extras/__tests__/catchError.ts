import { Observable } from '../../Observable'
import { catchError } from '../catchError'
import { pipe } from '../pipe'
import { createSubject } from '../subject'

describe('(Operator) catchError', () => {
  it('returns a new Observable', () => {
    expect(catchError(() => Observable.of(1))(Observable.of(2))).toBeInstanceOf(Observable)
  })

  it('does not propagate errors from original stream', async () => {
    const errorHandler = jest.fn()

    await new Promise((resolve) =>
      catchError(() => Observable.of(1))(
        new Observable((observer) => observer.error(new Error()))
      ).subscribe({
        error: errorHandler,
        complete: resolve
      })
    )

    expect(errorHandler).not.toHaveBeenCalled()
  })

  it('replaces stream with new Observable on error', async () => {
    const source = new Observable((observer) => {
      observer.next(1)
      observer.next(2)
      observer.error(new Error('error'))
    })

    const outputValues: any[] = []

    await new Promise((resolve) =>
      catchError(() => Observable.of(3, 4, 5))(source).subscribe({
        next: (value) => {
          outputValues.push(value)
        },
        complete: resolve
      })
    )

    expect(outputValues).toEqual([1, 2, 3, 4, 5])
  })

  it('passes the error value to the mapping function', async () => {
    const source = new Observable((observer) => observer.error('error'))

    const map = jest.fn(() => Observable.of(1))

    await new Promise((resolve) =>
      catchError(map)(source).subscribe({
        complete: resolve
      })
    )

    expect(map).toHaveBeenCalledWith('error')
  })

  it('does not modify stream if no error occurs', async () => {
    const source = Observable.of(1, 2, 3)

    const outputValues: any[] = []

    await new Promise((resolve) =>
      catchError(() => Observable.of(3, 4, 5))(source).subscribe({
        next: (value) => {
          outputValues.push(value)
        },
        complete: resolve
      })
    )

    expect(outputValues).toEqual([1, 2, 3])
  })

  it('should catch errors', () => {
    const [streamA, sinkA] = createSubject()
    const [streamB, sinkB] = createSubject()
    const result: any[] = []
    const o = pipe(catchError(() => streamB))(streamA)

    const subscriber = {
      next: (x: any) => result.push(x),
      error: jest.fn(),
      complete: jest.fn()
    }
    const sub = o.subscribe(subscriber)

    sinkA.next(1)
    sinkA.error(new Error())

    expect(result).toEqual([1])
    expect(subscriber.error).not.toBeCalled()
    expect(subscriber.complete).not.toBeCalled()
    expect(sub.closed).toBe(false)

    sinkA.next(2)
    expect(result).toEqual([1])

    sinkB.next(3)
    expect(result).toEqual([1, 3])

    const error = new Error()
    sinkB.next(4)
    sinkB.error(error)

    expect(result).toEqual([1, 3, 4])
    expect(subscriber.error).toBeCalledWith(error)
    expect(sub.closed).toBe(true)
  })
})
