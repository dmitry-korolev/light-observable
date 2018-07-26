# `skipRepeats`
```typescript
type skipRepeats = <T>(
  equals?: ((a: T, b: T, index: number) => boolean)
) => (stream: Observable<T>) => Observable<T>
```

```
stream:                -a-a-b-a-a-c-c->
skipRepeats()(stream): -a---b-a---c--->
```

Returns an Observable that emits all items emitted by the source Observable skipping adjacent repeating items, using the provided `equals` function. `equals` defaults to `(a, b) => a === b`.

```typescript
import { of } from 'light-observable/observable'
import { skipRepeats } from 'light-observable/operators'

const streamA = of(1, 1, 2, 2, 3, 4, 4, 1, 1, 2).pipe(
  skipRepeats()
)

streamA.subscribe(console.log)
/*
 -> 1
 -> 2
 -> 3
 -> 4
 -> 1
 -> 2
*/

const streamB = of('a', 'A', 'a', 'b', 'B', 'D', 'd').pipe(
  skipRepeats((a, b) => a.toLowerCase() === b.toLowerCase())
)

streamB.subscribe(console.log)
/*
 -> 'a'
 -> 'b'
 -> 'D'
*/
```

Also available as an Observable creator:
```typescript
import { skipRepeats, of } from 'light-observable/observable'
import { skipRepeats } from 'light-observable/operators'

const stream = skipRepeats(
  (a, b) => a.toLowerCase() === b.toLowerCase(),
  of('a', 'A', 'a', 'b', 'B', 'D', 'd')
)

stream.subscribe(console.log)
/*
 -> 'a'
 -> 'b'
 -> 'D'
*/
```