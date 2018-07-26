# `concat`
```typescript
type concat = <TS extends Array<Observable<any>>>(
  ...streams: TS
) => Observable<TS extends Array<Observable<infer T>> ? T : void>
```

```
streamA:                  -a-b-c-|
streamB:                  -d-e-f-|
concat(streamA, streamB): -a-b-c--d-e-f-|
```

Creates an output Observable which sequentially emits all values from given source `stream` and then moves on to the next.
```typescript
import { concat, of } from 'light-observable/observable'

concat(of(1, 2), of(3, 4)).subscribe(console.log)

/*
 -> 1
 -> 2
 -> 3
 -> 4
*/
```

Also available as an operator:
```typescript
import { of } from 'light-observable/observable'
import { concat } from 'light-observable/operator'

const stream = of(1, 2).pipe(
  concat(of(3, 4))
)

stream.subscribe(console.log)

/*
 -> 1
 -> 2
 -> 3
 -> 4
*/
```
