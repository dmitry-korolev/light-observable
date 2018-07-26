# `skipUntil`
```typescript
type skipUntil = (
  signal: Observable<any>
) => <T>(source: Observable<T>) => Observable<T>
```

```
source:                    -a-b-c-d-e->
signal:                    ----x------>
skipUntil(signal)(stream): -----c-d-e->
```

Skips values from the `source` Observable until `signal` Observable emits.
```typescript
import { fromEvent } from 'light-observable/observable'
import { skipUntil } from 'light-observable/operators'

const stream = fromEvent('mousemove', document).pipe(
  skipUntil(fromEvent('click', document))
)

stream.subscribe(console.log)
/*
 log mousemove events after click event
*/
```

Also available as an Observable creator:
```typescript
import { skipUntil, fromEvent } from 'light-observable/observable'
import {  } from 'light-observable/operators'

const stream = skipUntil(fromEvent('click', document), fromEvent('mousemove', document))

stream.subscribe(console.log)
/*
 log mousemove events after click event
*/
```