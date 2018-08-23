# `createSubject`
```typescript
type createSubject = <T>() => [Observable<T>, Observer<T>]
```

Returns a tuple of an Observable and a controller Observer.
```typescript
import { createSubject } from 'light-observable/observable'

const [stream, sink] = createSubject()

stream.subscribe(console.log)

sink.next(1)
sink.next(2)
sink.next(3)
sink.complete()
/*
 -> 1
 -> 2
 -> 3
*/
```

## Behavior mode
```typescript
import { createSubject } from 'light-observable/observable'

const [stream, sink] = createSubject({ initial: 1 })

stream.subscribe(val => console.log('a: ', val))
// -> a: 1

sink.next(2)
// -> a: 2

stream.subscribe(val => console.log('b: ', val))
// -> b: 2

sink.next(3)
// -> a: 3
// -> b: 3
```
