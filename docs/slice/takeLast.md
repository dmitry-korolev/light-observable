# `takeLast`
```typescript
type takeLast = (count: number) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:              -a-b-c-d--e|
takeLast(2)(stream): -----------[de]|
```

Emits only the last `count` values emitted by the source `stream`. Waits for `complete` event from the source and emits stored values synchronously followed be the `complete` event.

```typescript
import { of } from 'light-observable/observable'
import { takeLast } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5).pipe(
  takeLast(2)
)

stream.subscribe(console.log)
/*
 -> 4
 -> 5
*/
```

Also available as an Observable creator:
```typescript
import { takeLast, of } from 'light-observable/observable'

const stream = takeLast(2, of(1, 2, 3, 4, 5))

stream.subscribe(console.log)
/*
 -> 4
 -> 5
*/
```