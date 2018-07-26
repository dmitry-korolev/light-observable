# `mergeMapTo`
```typescript
type mergeMapTo = <R>(
  value: Observable<R> | Iterable<R>
) => (stream: Observable<any>) => Observable<R>
```

```
s:                     --a--b------->
source:                --1-2---3--4->
mergeMapTo(s)(source): --1-21-23-34->
```

Projects each source value to the provided Observable or Iterable which is merged into the output Observable.

```typescript
import { of, interval } from 'light-observable/observable'
import { mergeMapTo, take } from 'light-observable/operators'

const stream =  interval(1000).pipe(
  mergeMapTo(interval(100).pipe(take(3)))
)

stream.subscribe(console.log)
/*
 -> 0 // 1100ms
 -> 1 // 1200ms
 -> 2 // 1300ms
 -> 0 // 2100ms
 -> 1 // 2200ms
 -> 2 // 2300ms
 -> 0 // 3100ms
 -> 1 // 3200ms
 -> 2 // 3300ms
*/
```

Notice the difference between `mergeMapTo` and `mapTo`:
```typescript
import { of, interval } from 'light-observable/observable'
import { mergeMapTo, mapTo } from 'light-observable/operators'

const streamA =  interval(1000).pipe(
  mergeMapTo([1, 2, 3])
)

const streamB =  interval(1000).pipe(
  mapTo([1, 2, 3])
)

streamA.subscribe(x => console.log('streamA: ', x))
streamB.subscribe(x => console.log('streamB: ', x))
/*
 -> 'streamA: 1' // 1000ms
 -> 'streamA: 2' // 1000ms
 -> 'streamA: 3' // 1000ms
 -> 'streamB: 1, 2, 3' // 1000ms
*/
```


Also available as an Observable creator:
```typescript
import { of, interval, mergeMapTo } from 'light-observable/observable'
import { take } from 'light-observable/operators'

const stream = mergeMapTo(interval(100).pipe(take(3)), interval(1000))
stream.subscribe(console.log)
/*
 -> 0 // 1100ms
 -> 1 // 1200ms
 -> 2 // 1300ms
 -> 0 // 2100ms
 -> 1 // 2200ms
 -> 2 // 2300ms
 -> 0 // 3100ms
 -> 1 // 3200ms
 -> 2 // 3300ms
*/
```