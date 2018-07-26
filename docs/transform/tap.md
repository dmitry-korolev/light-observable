# `tap`
```typescript
type tap = <T>(
  fn: (value: T, index: number) => void
) => (stream: Observable<T>) => Observable<T>
```

```
stream:           --a--b--c--d->
tap(log)(stream): --a--b--c--d->
```

Performs a side-effect for each value emitted by the source `stream` with the provided `fn`. Return value of `fn` is ignored.
```typescript
import { of } from 'light-observable/observable'
import { tap, forEach, drain } from 'light-observable/operators'

of('a', 'b', 'c').pipe(
  tap((x, index) => console.log(x, index)),
  drain()
)

/*
 -> 'a', 0
 -> 'b', 1
 -> 'c', 2
*/
```

Also available as an Observable creator:
```typescript
import { tap, of } from 'light-observable/observable'
import { forEach, drain } from 'light-observable/operators'

tap((x, index) => console.log(x, index), of('a', 'b', 'c')).pipe(
  drain()
)

/*
 -> 'a', 0
 -> 'b', 1
 -> 'c', 2
*/

```