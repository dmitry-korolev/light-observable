import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { switchAll as switchAllOperator } from '../../operators/switchAll'
import { of } from '../of'
import { switchAll } from '../switchAll'

describe('(Extra) switchAll', () => {
  const stream = of([1], [2], [3])
  commonTest(switchAll(stream), switchAllOperator()(stream), [1, 2, 3])

  it('should propagate error from subscribing to inner stream', () => {
    const observer = getTestObserver()
    ;(switchAll as any)(of(1)).subscribe(observer)

    expect(observer.error).toBeCalled()
  })
})
