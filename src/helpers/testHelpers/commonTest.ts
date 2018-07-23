import { Observable } from '../../core/Observable'
import { forEach } from '../../observable'

const drain = (o: Observable<any>) => {
  const result: any[] = []
  return forEach((x) => result.push(x), o).then(() => result)
}
export const commonTest = (observable: any, curried?: any) => {
  it('should return Observable', () => {
    expect(observable).toBeInstanceOf(Observable)

    if (curried) {
      expect(curried).toBeInstanceOf(Observable)
    }
  })

  if (observable && curried) {
    it('should produce same results', async () => {
      jest.runAllTimers()
      const [resultA, resultB] = await Promise.all([drain(observable), drain(curried)])

      expect(resultA).toEqual(resultB)
    })
  }
}
