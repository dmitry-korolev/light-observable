# `mergeAll`
```typescript
type mergeAll = () => <T>(
  stream: Observable<Observable<T> | Iterable<T>>
) => Observable<T>
```

```
s:                  --a--b--c--d->
t:                  -e-f--gh--j-->
stream:             s---t-------->
mergeAll()(stream): --a--bghc-jd->
```

Given a higher-order `stream`, return a new stream that merges all the inner streams as they arrive.

```typescript
import { interval, of } from 'light-observable/observable'
import { mergeAll } from 'light-observable/operator'

const stream = of([1, 2], of(3, 4), interval(100)).pipe(
  mergeAll()
)

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

