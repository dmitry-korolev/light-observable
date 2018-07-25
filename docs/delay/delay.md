# `delay`
```typescript
type delay = (wait: number) => <T>(stream: Observable<T>): Observable<T>
```

```
stream:           -a-b-c-d-|
delay(2)(stream): ---a-b-c-d-|
```

Delay stream events by the specified number of milliseconds. Maintains the relative spacing of events. Doesn't delay error event.

```typescript
import { of } from 'light-observable/observable'
import { delay } from 'light-observable/operators'

const stream = of(1, 2, 3).pipe(
  delay(1000)
)

stream.subscribe(console.log)
/*
 Second after:
 -> 1
 -> 2
 -> 3
*/
```

Also available as an Observable creator:
```typescript
import { delay, of } from 'light-observable/observable'

const stream = delay(1000, of(1, 2, 3))

stream.subscribe(console.log)
/*
 Second after:
 -> 1
 -> 2
 -> 3
*/
```
