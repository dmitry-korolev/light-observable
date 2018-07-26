# `switchMapTo`
```typescript
type switchMapTo = <T>(
  value: Observable<T> | Iterable<T>
) => <T>(stream: Observable<any>) => Observable<T>
```

```
streamA:                     a-------b---c->
streamB:                     1-2-3-4-5-6-7->
switchMap(streamB)(streamA): 1-2-3-4-1-2-1->
```

Projects each source `stream` value to the same Observable or Iterable `value` which is flattened multiple times with `switchMap` in the output Observable.

```typescript
import { fromEvent, interval } from 'light-observable/observable'
import { switchMapTo } from 'light-observable/operators'

const clicks = fromEvent(document, 'click')
const stream = clicks.pipe(
  switchMapTo(interval(1000))
)

stream.subscribe(x => console.log(x))

/*
 Restarts an interval observa
*/
```

Also available as an Observable creator:
```typescript
import { switchMapTo, fromEvent, interval } from 'light-observable/observable'

const stream = switchMapTo(interval(1000), fromEvent(document, 'click'))

stream.subscribe(x => console.log(x))

/*
 Restarts an interval observa
*/
```

