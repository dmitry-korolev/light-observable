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
