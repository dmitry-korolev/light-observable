import { Observable } from '../../core/Observable'
import { of } from '../../observable/of'
import { catchError, forEach, timeout } from '../../operators'

const drain = (o: Observable<any>) => {
  const result: any[] = []
  return o
    .pipe(
      timeout(100),
      catchError((e) => of(e)),
      forEach((x) => result.push(x))
    )
    .then(() => result)
}

export const commonTest = (observable: any, curried: any = observable, ...args: any[]) => {
  it('should return Observable', () => {
    expect(observable).toBeInstanceOf(Observable)

    if (observable !== curried) {
      expect(curried).toBeInstanceOf(Observable)
    }
  })

  it('should produce same results', async () => {
    const _resultA = drain(observable)
    jest.runAllTimers()
    const resultA = await _resultA

    if (observable !== curried) {
      const _resultB = drain(curried)
      jest.runAllTimers()
      const resultB = await _resultB
      expect(resultA).toEqual(resultB)
    }

    if (args.length > 0) {
      expect(resultA).toEqual(args)
    }
  })
}
