# `scan`
```typescript
type scan = <T, R>(
  fn: (result: R, value: T, index: number) => void,
  initial: R
) => (stream: Observable<T>) => Observable<R>
```

```
stream:               -1-2-3->
scan(add, 0, stream): -1-3-6->
```

Create a new stream containing incrementally accumulated results, starting with the provided initial value.

```typescript
import { interval } from 'light-observable/observable'
import { scan, take } from 'light-observable/operators'

const stream = interval(50).pipe(
  take(5),
  scan((prev, value) => prev + value, 0)
)

stream.subscribe(console.log)
/*
 -> 0
 -> 1
 -> 3
 -> 6
 -> 10
*/
```

Also available as an Observable creator:
```typescript
import { scan, interval } from 'light-observable/observable'
import { take } from 'light-observable/operators'

const stream = interval(50).pipe(
  take(5)
)

scan((prev, value) => prev + value, 0, stream).subscribe(console.log)
/*
 -> 0
 -> 1
 -> 3
 -> 6
 -> 10
*/
```