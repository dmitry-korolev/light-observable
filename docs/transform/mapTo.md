# `mapTo`
```typescript
type mapTo = <T, R>(value: R) => (stream: Observable<T>) => Observable<R>
```

```
stream:           -1-2-3-4->
mapTo(0)(stream): -0-0-0-0->
```

Creates an Observable by replacing each emit of a source `stream` with a provided `value`.
```typescript
import { of } from 'light-observable/observable'
import { mapTo } from 'light-observable/operators'

const stream = of(1, 2, 3).pipe(
  mapTo(0)
)

stream.subscribe(console.log)
/*
 -> 0
 -> 0
 -> 0
*/
```

Also available as an Observable creator:
```typescript
import { mapTo, of } from 'light-observable/observable'

const stream = mapTo(0, of(1, 2, 3))

stream.subscribe(console.log)
/*
 -> 0
 -> 0
 -> 0
*/
```
