import { Observable } from '../Observable'
import { testMethodProperty } from './utils'

describe('(Core) subscription', () => {
  // tslint:disable-next-line no-empty
  function getSubscription(subscriber = () => {}) {
    return new Observable(subscriber).subscribe()
  }

  describe('unsubscribe', () => {
    it('is a method on Subscription.prototype', () => {
      const subscription = getSubscription()
      testMethodProperty(Object.getPrototypeOf(subscription), 'unsubscribe', {
        configurable: true,
        writable: true,
        length: 0
      })
    })

    it('reports an error if the cleanup function throws', () => {
      expect.assertions(1)
      const error = {}
      const subscription = getSubscription(() => {
        return () => {
          throw error
        }
      })

      try {
        subscription.unsubscribe()
        expect(true).toBe(false)
      } catch (err) {
        expect(err).toBe(error)
      }
    })

    it('does nothing if no cleanup function was provided', () => {
      const subscription = new Observable(() => undefined).subscribe()
      expect(() => subscription.unsubscribe()).not.toThrow()
    })

    it('does nothing if no something weird was provided instead of cleanup function', () => {
      // @ts-ignore
      const subscription = new Observable(() => ({ gotcha: true })).subscribe()
      expect(() => subscription.unsubscribe()).not.toThrow()
    })

    it('accepts a cleanup function from the subscriber function', () => {
      let cleanupCalled = false
      const subscription = new Observable(() => {
        return () => (cleanupCalled = true)
      }).subscribe()
      subscription.unsubscribe()
      expect(cleanupCalled).toBe(true)
    })

    it('accepts a subscription object from the subscriber function', () => {
      let cleanupCalled = false
      const subscription = new Observable(() => {
        return {
          unsubscribe() {
            cleanupCalled = true
          }
        }
      }).subscribe()
      subscription.unsubscribe()
      expect(cleanupCalled).toBe(true)
    })
  })

  describe('closed', () => {
    it('is a getter on Subscription.prototype', () => {
      const subscription = getSubscription()
      testMethodProperty(Object.getPrototypeOf(subscription), 'closed', {
        configurable: true,
        writable: true,
        get: true
      })
    })

    it('does nothing if subscription is closed', () => {
      const subscription = getSubscription()
      expect(subscription._observer).toBeDefined()

      subscription.unsubscribe()
      expect(subscription._observer).toBeUndefined()

      subscription._observer = {}

      subscription.unsubscribe()
      expect(subscription._observer).toBeDefined()
    })
  })
})
