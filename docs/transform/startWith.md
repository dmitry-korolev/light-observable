# `startWith`
```typescript
type startWith = <RS extends any[]>(
  ...values: RS
) => <T>(
  stream: Observable<T>
) => Observable<RS extends Array<infer R> ? R : null | T>
```

```
stream:                   --a-b--c-d-->
startWith(1,2,3)(stream): 123--a-b--c-d-->
```

Prepends the source `stream` with provided `values`.

```typescript
import { of } from 'light-observable/observable'
import { startWith } from 'light-observable/operators'

const stream = of(1, 2, 3).pipe(
  startWith(4, 5, 6)
)

stream.subscribe(console.log)
/*
 -> 4
 -> 5
 -> 6
 -> 1
 -> 2
 -> 3
*/
```

Also available as an Observable creator:
```typescript
import { startWith, of } from 'light-observable/observable'

const stream = startWith(of(1, 2, 3), 4, 5, 6)

stream.subscribe(console.log)
```