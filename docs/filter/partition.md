# `partition`
```typescript
type partition = <T>(predicate: (value: T) => boolean) => (stream: Observable<T>) => [Observable<T>, Observable<T>]
```

```
stream:       -1-2-3-4-5-6|
filter(even): ---2---4---6|
```

Splits an Observable into two: one of values, that satisfy the provided predicate, and another of values, that don't.

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
````