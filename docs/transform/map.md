# `map`
```typescript
type map = <T, R>(fn: (value: T) => R) => (stream: Observable<T>) => Observable<R>
```

```
stream:              -1-2-3-4->
map(double)(stream): -2-4-6-8->
```

Creates an Observable by applying a provided `fn` to each emit of a source `stream`.
```typescript
import { of } from 'light-observable/observable'
import { map } from 'light-observable/operators'

const stream = of(1, 2, 3).pipe(
  map(x => x * 2)
)

stream.subscribe(console.log)
/*
 -> 2
 -> 4
 -> 6
*/
```

Also available as an Observable creator:
```typescript
import { map, of } from 'light-observable/observable'

const stream = map(x => x * 2, of(1, 2, 3))

stream.subscribe(console.log)
/*
 -> 2
 -> 4
 -> 6
*/
```
