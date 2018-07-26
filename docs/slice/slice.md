# `slice`
```typescript
type slice = (from: number, to: number) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:              -a-b-c-d-e->
slice(1, 3)(stream): ---b-c|
```

Create a new stream containing only events where `from` <= `index` < `to`, where `index` is the ordinal index of an event in stream.

```typescript
import { of } from 'light-observable/observable'
import { slice } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5).pipe(
  slice(1, 3)
) 

stream.subscribe(console.log)
/*
 -> 2
 -> 3
*/
```

Also available as an Observable creator:
```typescript
import { slice, of } from 'light-observable/observable'

const stream = slice(1, 3, of(1, 2, 3, 4, 5))

stream.subscribe(console.log)
/*
 -> 2
 -> 3
*/
```