import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { mergeMap as mergeMapOperator } from '../../operators/mergeMap'
import { mergeMap } from '../mergeMap'
import { of } from '../of'

describe('(Extra) mergeMap', () => {
  commonTest(
    mergeMap((x) => of(x), of(1, 2, 3)),
    mergeMapOperator((x: number) => of(x))(of(1, 2, 3)),
    [1, 2, 3]
  )

  it('should use the mapping function', () => {
    const map = jest.fn((x: number) => of(x * 2))
    const observer = getTestObserver()

    mergeMap(map, of(1)).subscribe(observer)
    expect(map).toBeCalledWith(1)
    expect(observer.next).toBeCalledWith(2)
  })

  it('should propagate errors in the mapping function', () => {
    const error = new Error()
    const map = () => {
      throw error
    }
    const observer = getTestObserver()

    mergeMap(map, of(1)).subscribe(observer)
    expect(observer.error).toHaveBeenCalledWith(error)
  })
})
