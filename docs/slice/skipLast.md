# `skipLast`
```typescript
type skipLast = (count: number) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:              -a-b-c-d--e->
skipLast(2)(stream): -----a-b--c->
```

Skips last `count` values emitted by the source Observable.

```typescript
import { of } from 'light-observable/observable'
import { skipLast } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5).pipe(
  skipLast(2)
)

stream.subscribe(console.log)
/*
 -> 1
 -> 2
 -> 3
*/
```

Also available as an Observable creator:
```typescript
import { skipLast, of } from 'light-observable/observable'

const stream = skipLast(2, of(1, 2, 3, 4, 5))

stream.subscribe(console.log)
/*
 -> 1
 -> 2
 -> 3
*/
```