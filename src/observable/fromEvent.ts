import { Observable } from '../core/Observable'

type EventEmitter = {
  addListener(event: string | symbol, listener: (...args: any[]) => void): any
  removeListener(event: string | symbol, listener: (...args: any[]) => void): any
}

const isEventTarget = (arg: any): arg is EventTarget => {
  return typeof arg.addEventListener === 'function' && typeof arg.removeEventListener === 'function'
}

const isEventEmitterA = (arg: any): arg is EventEmitter => {
  return typeof arg.addListener === 'function' && typeof arg.removeListener === 'function'
}

const fromDOMEvent = (eventSource: EventTarget, eventName: string, capture: boolean) => {
  return new Observable<Event>((observer) => {
    const listener = (event: Event) => observer.next(event)

    try {
      eventSource.addEventListener(eventName, listener, capture)
    } catch (error) {
      observer.error(error)
    }

    return () => eventSource.removeEventListener(eventName, listener)
  })
}

const fromEE = <T>(eventSource: EventEmitter, eventName: string | symbol) => {
  return new Observable<T>((observer) => {
    const listener = (...events: any[]) => {
      events.length > 1 ? observer.next(events as any) : observer.next(events[0])
    }

    try {
      eventSource.addListener(eventName, listener)
    } catch (error) {
      observer.error(error)
    }

    return () => eventSource.removeListener(eventName, listener)
  })
}

export function fromEvent<T>(eventSource: EventEmitter, eventName: string | symbol): Observable<T>
export function fromEvent(
  eventSource: EventTarget,
  eventName: string,
  capture?: boolean
): Observable<Event>
export function fromEvent(eventSource: any, eventName: string | symbol, capture: boolean = false) {
  if (isEventTarget(eventSource)) {
    return fromDOMEvent(eventSource, eventName as string, capture)
  }

  if (isEventEmitterA(eventSource)) {
    return fromEE(eventSource, eventName)
  }

  throw new Error(
    'Source must support addEventListener/removeEventListener or addListener/removeListener'
  )
}
