# `combineLatest`
```typescript
type combineLatest = <T>(...streams: Array<Observable<T>>) => Observable<T[]>
```

```
streamA:                         -a-b-c-d-e-f-g-h->
streamB:                         --1--2--3--4--5->
combineLatest(streamA, streamB): --[a,1][b,1]-[c,2]->
```

When any source `stream` emits a value, emits the latest value from each.

```typescript
import { combineLatest, interval } from 'light-observable/observable'

const stream = combineLatest(interval(300), interval(1000))

stream.subscribe(console.log)

/*
 -> [2, 0] // 1000ms
 -> [3, 0] // 1200ms
 -> [4, 0] // 1500ms
 -> [5, 0] // 1800ms
 -> [5, 1] // 2000ms
 -> [6, 1] // 2100ms
 ...
 -> [Infinity, Infinity]
*/


```

Also available as an operator:
```typescript
import { interval } from 'light-observable/observable'
import { combineLatest } from 'light-observable/operator'

const stream = interval(750).pipe(
  combineLatest(interval(300), interval(1000))
)

stream.subscribe(console.log)

/*
 -> [0, 2, 0] // 1000ms
 -> [0, 3, 0] // 1200ms
 -> [1, 3, 0] // 1500ms
 -> [1, 4, 0] // 1500ms
 -> [1, 5, 0] // 1800ms
 -> [1, 5, 1] // 2000ms
 -> [1, 6, 1] // 2100ms
 -> [2, 6, 1] // 2250ms
 ...
 -> [Infinity, Infinity]
*/
```
