# `reject`
```typescript
type reject = <T>(predicate: (value: T) => boolean) => (stream: Observable<T>) => Observable<T>
```

```
stream:       -1-2-3-4-5-6|
filter(even): -1---3---5--|
```

Create a stream containing only events for which `predicate` returns falsy.

```typescript
import { of } from 'light-observable/observable'
import { reject } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5, 6).pipe(
  reject(x => x % 2 === 0)
)

stream.subscribe(console.log)
/*
 -> 1
 -> 3
 -> 5
*/
```

Also available as an Observable creator:
```typescript
import { reject, of } from 'light-observable/observable'

const stream = reject(x => x % 2 === 0, of(1, 2, 3, 4, 5, 6))

stream.subscribe(console.log)
/*
 -> 1
 -> 3
 -> 5
*/
```
