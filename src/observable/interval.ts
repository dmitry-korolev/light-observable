import { clearInterval } from 'timers'
import { Observable } from '../core/Observable'

export const interval = (period: number): Observable<number> => {
  return new Observable((observer) => {
    let i = 0
    const intervalId = setInterval(() => {
      observer.next(i++)
    }, period)

    return () => clearInterval(intervalId)
  })
}
