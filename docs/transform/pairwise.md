# `pairwise`
```typescript
type pairwise = () => <T>(stream: Observable<T>) => Observable<[T, T]>
```

```
source:           --a--b--c-->
pairwise(source): -----[a,b]--[b,c]-->
```

Returns an Observable, that groups consecutive emissions into pairs, and emits them as an arrays of values. Starts emitting from the second emit of the source Observable.
```typescript
import { of } from 'light-observable/observable'
import { pairwise } from 'light-observable/operators'

const stream = of(1, 2, 3, 4).pipe(
  pairwise()
)

stream.subscribe(console.log)
/*
 -> [1, 2]
 -> [2, 3]
 -> [3, 4]
*/
```

Also available as an Observable creator:
```typescript
import { pairwise, of } from 'light-observable/observable'

const stream = pairwise(of(1, 2, 3, 4))

stream.subscribe(console.log)

/*
 -> [1, 2]
 -> [2, 3]
 -> [3, 4]
*/
```