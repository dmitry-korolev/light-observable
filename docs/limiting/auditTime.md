# `auditTime`
```typescript
type auditTime = (
  duration: number
) => <T>(stream: Observable<T>) => Observable<T>
```

```
source:               -a-b-c-d-e-f->
auditTime(5)(source): ----b----e->
```

Ignores source values for `duration` milliseconds, then emits the most recent value from the source Observable, then repeats this process.
```typescript
import { fromEvent } from 'light-observable/observable'
import { auditTime } from 'light-observable/operators'

const clicks = fromEvent(document, 'click')
const result = clicks.pipe(auditTime(1000))
result.subscribe(console.log)
```

Also available as an Observable creator:
```typescript
import { auditTime, fromEvent } from 'light-observable/observable'

const result = auditTime(1000, fromEvent(document, 'click'))
result.subscribe(console.log)
```
