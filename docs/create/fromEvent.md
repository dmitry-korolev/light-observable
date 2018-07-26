# `fromEvent`
```typescript
type fromEvent = (
  eventSource: EventEmitter | EventTarget,
  eventName: string | symbol,
  capture?: boolean
) => Observable<any>
```

```
source:                       -a--b--c----d->
fromEvent(source, eventName): -a--b--c----d->
```

Creates an Observable containing `eventName` events from provided `eventSource` (EventTarget like a DOM element, or an EventEmitter like a Node EventEmitter).

When subscribing to an EventTarget, a third parameter, `capture`, may be provided. If not provided, will default to `false`.
```typescript
import { fromEvent } from 'light-observable/observable'

const stream = fromEvent(document, 'click')

stream.subscribe(console.log)
```
