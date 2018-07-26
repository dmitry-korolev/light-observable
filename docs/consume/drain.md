# `drain`
```typescript
type drain = <T>() => (stream: Observable<S>) => Promise<void>
```

Starts consuming a source `stream`. Returns a Promise, which resolves when the source completes, or rejects if the source errors.

```typescript
import { of } from 'light-observable/observable'
import { drain } from 'light-observable/operators'

const promise = of(1, 2, 3).pipe(
  drain()
)

promise.then(() => console.log('done!'))
/*
 -> 'done!'
*/
```

Also available as function:
```typescript
import { drain, of } from 'light-observable/observable'

const promise = drain(of(1, 2, 3))

promise.then(() => console.log('done!'))
/*
 -> 'done!'
*/
```
