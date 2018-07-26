# `debounceTime`
```typescript
type debounceTime = (
  dueTime: number
) => <T>(stream: Observable<T>) => Observable<T>
```

```
stream:                  -abc--d--ef--g->
debounceTime(2)(stream): -----c--d---f-->

```

Emits a value from the source Observable only after a particular time span has passed without another source emission.
```typescript
import { fromEvent } from 'light-observable/observable'
import { debounceTime } from 'light-observable/operators'

const clicks = fromEvent(document, 'click')
const result = clicks.pipe(auditTime(1000))
result.subscribe(console.log)
```

Also available as an Observable creator:
```typescript
import { debounceTime, fromEvent } from 'light-observable/observable'

const result = debounceTime(1000, fromEvent(document, 'click'))
result.subscribe(console.log)
```
