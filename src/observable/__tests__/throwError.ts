import { commonTest } from '../../helpers/testHelpers/commonTest'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { throwError } from '../throwError'

describe('(Extra) throwError', () => {
  commonTest(throwError('error'), undefined, ['error'])

  it('should throw immediately', () => {
    const observer = getTestObserver()
    throwError('error').subscribe(observer)

    expect(observer.error).toBeCalledWith('error')
  })
})
