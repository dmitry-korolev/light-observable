# `filter`
```typescript
type filter = <T>(
  predicate: (value: T, index: number) => boolean
) => (stream: Observable<T>) => Observable<T>
```

```
stream:       -1-2-3-4-5-6|
filter(even): ---2---4---6|
```

Create a stream containing only events for which `predicate` returns truthy.

```typescript
import { of } from 'light-observable/observable'
import { filter } from 'light-observable/operators'

const stream = of(1, 2, 3, 4, 5, 6).pipe(
  filter(x => x % 2 === 0)
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
import { filter, of } from 'light-observable/observable'

const stream = filter(x => x % 2 === 0, of(1, 2, 3, 4, 5, 6))

stream.subscribe(console.log)
/*
 -> 2
 -> 4
 -> 6
*/
```
