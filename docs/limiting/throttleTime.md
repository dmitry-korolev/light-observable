# `throttleTime`
```typescript
type throttleTime = (
  duration: number
) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:              -abcd----abcde--->
throttle(2)(stream): -a-c-----a-c-e--->
```

Limit the rate of events to at most one per throttlePeriod.

```typescript
import { fromEvent } from 'light-observable/observable'
import { throttleTime } from 'light-observable/operators'

const clicks = fromEvent(document, 'click')
const result = clicks.pipe(throttleTime(1000))
result.subscribe(console.log)
```

Also available as an Observable creator:
```typescript
import { throttleTime, fromEvent } from 'light-observable/observable'

const result = throttleTime(1000, fromEvent(document, 'click'))
result.subscribe(console.log)
```
