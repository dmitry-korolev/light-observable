# `take`
```typescript
type take = (count: number) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:          -a-b-c-d-e->
take(2)(stream): -a-b|
```

Takes first `count` values emitted by the source `stream` and completes.

```typescript
import { of } from 'light-observable/observable'
import { take } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5).pipe(
  take(2)
) 

stream.subscribe(console.log)
/*
 -> 1
 -> 2
*/
```

Also available as an Observable creator:
```typescript
import { take, of } from 'light-observable/observable'

const stream = take(2, of(1, 2, 3, 4, 5))

stream.subscribe(console.log)
/*
 -> 1
 -> 2
*/
```