// tslint:disable no-floating-promises await-promise
import { Observable } from '../../core/Observable'
import { of } from '../../observable/of'
import { catchError, forEach, timeout } from '../../operators'

const drain = async (o: Observable<any>) => {
  const result: any[] = []
  o.pipe(
    timeout(100),
    catchError((e) => of(e)),
    forEach((x) => result.push(x))
  )

  // Angry time hacks
  await null
  jest.runTimersToTime(100)
  await null

  return result
}

export const commonTest = (observable: any, curried: any = observable, args?: any[]) => {
  it('should return Observable', () => {
    expect(observable).toBeInstanceOf(Observable)

    if (observable !== curried) {
      expect(curried).toBeInstanceOf(Observable)
    }
  })

  it('should produce same results', async () => {
    const resultA = await drain(observable)

    if (observable !== curried) {
      const resultB = await drain(curried)
      expect(resultA).toEqual(resultB)
    }

    if (args) {
      expect(resultA).toEqual(args)
    }
  })
}
