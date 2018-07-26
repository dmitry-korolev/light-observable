# `merge`
```typescript
type merge = <TS extends Array<Observable<any>>>(
  ...streams: TS
) => Observable<TS extends Array<Observable<infer T>> ? T : void>
```

```
streamA:                 -a-b---c->
streamB:                 --d-e-f-->
merge(streamA, streamB): -adbe-fc->
```

Creates an output Observable which merges source `streams` and emits all values from them.
```typescript
import { merge, interval } from 'light-observable/observable'

const stream = merge(
  interval(100),
  interval(150)
)

stream.subscribe(console.log)

/*
 -> 0 // 100
 -> 0 // 150
 -> 1 // 200
 -> 2 // 300
 -> 1 // 300
 -> 3 // 400
 -> 2 // 450
 ...
*/
```

Also available as an operator:
```typescript
import { interval } from 'light-observable/observable'
import { merge } from  'light-observable/operator'

const stream = interval(100).pipe(
  merge(interval(150))
)

stream.subscribe(console.log)

/*
 -> 0 // 100
 -> 0 // 150
 -> 1 // 200
 -> 2 // 300
 -> 1 // 300
 -> 3 // 400
 -> 2 // 450
 ...
*/
```
