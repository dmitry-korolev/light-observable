# `groupBy`
```typescript
type groupBy = <T>(
  selector: (value: T) => any
) => (stream: Observable<T>) => Observable<T>
```

```
stream:                -0-1-2-3-4-5->
groupBy(even)(stream): -a-b--------->
                        | ↓
                        ↓	1---3---5->
                        0---2---4--->
```

Groups values of a source `stream` into groups by specified `selector`. When a source emits a value belonging to a new group, a new Observable of that group is emitted. 
```typescript
import { interval } from 'light-observable/observable'
import { groupBy, map, mergeAll } from 'light-observable/operators'

const stream = interval(1000).pipe(
  groupBy(n => n % 2),
  map((stream, index) => stream.pipe(
    map(value => ({ stream: index, value }))
  )),
  mergeAll()
)

stream.subscribe(console.log)
/*
 -> { stream: 0, value: 0 }
 -> { stream: 1, value: 1 }
 -> { stream: 0, value: 2 }
 -> { stream: 1, value: 3 }
 -> { stream: 0, value: 4 }
 -> { stream: 1, value: 5 }
 -> { stream: 0, value: 6 }
 -> { stream: 1, value: 7 }
 ...
*/
```

Also available as an Observable creator:
```typescript
import { groupBy, interval } from 'light-observable/observable'
import { groupBy, map, mergeAll } from 'light-observable/operators'

const stream = groupBy(n => n % 2, interval(1000)).pipe(
  map((stream, index) => stream.pipe(
    map(value => ({ stream: index, value }))
  )),
  mergeAll()
)

stream.subscribe(console.log)
/*
 -> { stream: 0, value: 0 }
 -> { stream: 1, value: 1 }
 -> { stream: 0, value: 2 }
 -> { stream: 1, value: 3 }
 -> { stream: 0, value: 4 }
 -> { stream: 1, value: 5 }
 -> { stream: 0, value: 6 }
 -> { stream: 1, value: 7 }
 ...
*/
```