# `forEach`
```typescript
type forEach = <T>(
  fn?: (value: T, index: number) => void
) => (stream: Observable<S>) => Promise<void>
```

Starts consuming a source `stream`, processing each `next` event with provided `fn`. Returns a Promise, which resolves when the source completes, or rejects if the source errors.
```typescript
import { of } from 'light-observable/observable'
import { forEach } from 'light-observable/operators'

const promise = of(1, 2, 3).pipe(
  forEach(console.log)
)

promise.then(() => console.log('done!'))
/*
 -> 1
 -> 2
 -> 3
 -> 'done!'
*/
```

Also available as function:
```typescript
import { forEach, of } from 'light-observable/observable'

const promise = forEach(console.log, of(1, 2, 3))

promise.then(() => console.log('done!'))
/*
 -> 1
 -> 2
 -> 3
 -> 'done!'
*/
```
