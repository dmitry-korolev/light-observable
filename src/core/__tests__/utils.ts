import { Observable } from '../Observable'
import { SubscriptionObserver, PartialObserver } from '../types.h'

export function testMethodProperty(object: any, key: string, options: any) {
  const desc = Object.getOwnPropertyDescriptor(object, key)
  const { enumerable = false, configurable = false, writable = false, length } = options

  expect(desc).toBeDefined()

  if (options.get || options.set) {
    if (options.get) {
      expect(typeof desc!.get).toBe('function')
      expect(desc!.get!.length).toBe(0)
    } else {
      expect(typeof desc!.get).toBe(undefined)
    }

    if (options.set) {
      expect(typeof desc!.set).toBe('function')
      expect(desc!.set!.length).toBe(1)
    } else {
      expect(desc!.set).toBe(undefined)
    }
  } else {
    expect(typeof desc!.value).toBe('function')
    expect(desc!.value.length).toBe(length)
    expect(desc!.writable).toBe(writable)
  }

  expect(desc!.enumerable).toBe(enumerable)
  expect(desc!.configurable).toBe(configurable)
}

export function getObserver<T>(inner?: PartialObserver<T> | ((value: T) => void)) {
  let observer: SubscriptionObserver<T>
  new Observable((x) => {
    observer = x
    // @ts-ignore
  }).subscribe(inner || {})
  return observer! // tslint:disable-line no-unnecessary-type-assertion
}

it('dummy', () => {
  expect(true).toBe(true)
})
