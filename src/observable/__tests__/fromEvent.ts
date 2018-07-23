import { commonTest } from '../../helpers/testHelpers/commonTest'
import { FakeEventEmitter } from '../../helpers/testHelpers/fakeEventEmitter'
import { FakeEventTarget } from '../../helpers/testHelpers/fakeEventTarget'
import { getTestObserver } from '../../helpers/testHelpers/getTestObserver'
import { fromEvent } from '../fromEvent'

jest.useFakeTimers()

describe('(Extra) fromEvent', () => {
  describe('given an EventTarget', () => {
    commonTest(fromEvent(new FakeEventTarget(), 'test', false))

    it('should subscribe with provided eventName', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()

      fromEvent(ET, 'test').subscribe(observer)

      expect(ET.addEventListener).toBeCalled()
      expect(ET.addEventListener.mock.calls[0][0]).toBe('test')
    })

    it('should contain emitted items', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()

      fromEvent(ET, 'test').subscribe(observer)

      ET.dispatchEvent(1)
      expect(observer.next).toBeCalledWith(1)

      ET.dispatchEvent(2)
      expect(observer.next).toBeCalledWith(2)
    })

    it('should unsubscribe', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()
      const sub = fromEvent(ET, 'test').subscribe(observer)

      sub.unsubscribe()

      expect(ET.removeEventListener).toBeCalled()
      expect(ET.removeEventListener.mock.calls[0][0]).toBe('test')
    })

    it('should pass capture param', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()

      fromEvent(ET, 'test', true).subscribe(observer)
      expect(ET.addEventListener.mock.calls[0][2]).toBe(true)
    })

    it('should pass false if capture not provided', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()

      fromEvent(ET, 'test').subscribe(observer)
      expect(ET.addEventListener.mock.calls[0][2]).toBe(false)
    })

    it('errors if adding listener failed', () => {
      const ET = new FakeEventTarget()
      const observer = getTestObserver()
      const error = {}
      ET.addEventListener = jest.fn(() => {
        throw error
      })

      fromEvent(ET, 'test').subscribe(observer)
      expect(observer.error).toBeCalledWith(error)
    })
  })

  describe('given an EventEmitter', () => {
    commonTest(fromEvent(new FakeEventEmitter(), 'test'))

    it('should subscribe with provided eventName', () => {
      const EE = new FakeEventEmitter()
      const observer = getTestObserver()

      fromEvent(EE, 'test').subscribe(observer)

      expect(EE.addListener).toBeCalled()
      expect(EE.addListener.mock.calls[0][0]).toBe('test')
    })

    it('should contain emitted items', () => {
      const EE = new FakeEventEmitter()
      const observer = getTestObserver()

      fromEvent(EE, 'test').subscribe(observer)

      EE.emit(1)
      expect(observer.next).toBeCalledWith(1)

      EE.emit(2)
      expect(observer.next).toBeCalledWith(2)
    })

    it('should unsubscribe', () => {
      const EE = new FakeEventEmitter()
      const observer = getTestObserver()
      const sub = fromEvent(EE, 'test').subscribe(observer)

      sub.unsubscribe()

      expect(EE.removeListener).toBeCalled()
      expect(EE.removeListener.mock.calls[0][0]).toBe('test')
    })

    it('should convert multiple args to an array', () => {
      const EE = new FakeEventEmitter()
      const observer = getTestObserver()

      fromEvent(EE, 'test').subscribe(observer)

      EE.emit(1, 2, 3)
      expect(observer.next).toBeCalledWith([1, 2, 3])
    })

    it('errors if adding listener failed', () => {
      const EE = new FakeEventEmitter()
      const observer = getTestObserver()
      const error = {}
      EE.addListener = jest.fn(() => {
        throw error
      })

      fromEvent(EE, 'test').subscribe(observer)
      expect(observer.error).toBeCalledWith(error)
    })
  })

  describe('given unsupported source', () => {
    it('throws', () => {
      const EE: any = {}

      expect(() => fromEvent(EE, 'test')).toThrow()
    })
  })
})
