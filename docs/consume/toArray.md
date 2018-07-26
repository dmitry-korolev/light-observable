# `toArray`
```typescript
type toArray = () => <T>(stream: Observable<T>) => Promise<R>
```

Starts consuming the source `stream` and returns a Promise, which resolves with an array of every value of the source.

```typescript
import { interval } from 'light-observable/observable'
import { toArray, take } from 'light-observable/operators'

const promise = interval(50).pipe(
  take(3),
  toArray()
)

promise.then(console.log)
/*
 -> [0, 1, 2]
*/
```

Also available as function:
```typescript
import { toArray, interval } from 'light-observable/observable'
import { take } from 'light-observable/operators'

const promise = toArray(interval(50).pipe(
  take(3)
))

promise.then(console.log)
/*
 -> [0, 1, 2]
*/
```
