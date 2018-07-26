# `mergeMap`
```typescript
type mergeMap = <T, R>(fn: (value: T) => Observable<T> | Iterable<T>) => <T>(stream: Observable<T>) => Observable<R>
```

```
stream:               a---b---c---d->
fn(x):                -xx|
mergeMap(fn)(stream): -aa---bb--bb--dd->
```

Given a higher-order stream, return a new stream that merges all the inner streams as they arrive.

```typescript
import { interval, of } from 'light-observable/observable'
import { mergeMap } from 'light-observable/operator'

const stream = interval(1000).pipe(
  mergeMap(x => of(x, x + 10, x + 20))
)

stream.subscribe(console.log)
/*
 -> 0 // 1000ms
 -> 10 // 1000ms
 -> 20 // 1000ms
 -> 1 // 2000ms
 -> 11 // 2000ms
 -> 21 // 2000ms
 ...
*/
```

Also available as an Observable creator:
```typescript
import { mergeAll, interval, of } from 'light-observable/observable'

const stream = mergeAll(of(
  [1, 2],
  of(3, 4),
  interval(100)
))

stream.subscribe(console.log)
/*
 -> 1
 -> 2
 -> 3
 -> 4
 -> 0 // 100ms
 -> 1 // 200ms
*/
```

