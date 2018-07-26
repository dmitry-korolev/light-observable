# `takeUntil`
```typescript
type takeUntil = (signal: Observable<any>) => <T>(source: Observable<T>) => Observable<T>
```

```
source:                    -a-b-c-d-e->
signal:                    ----x------>
takeUntil(signal)(stream): -a-b|
```

Mirrors values from the `source` Observable and completes when `signal` Observable emits.
```typescript
import { fromEvent } from 'light-observable/observable'
import { takeUntil } from 'light-observable/operators'

const stream = fromEvent('mousemove', document).pipe(
  takeUntil(fromEvent('click', document))
)

stream.subscribe(console.log)
/*
 log mousemove events until the mouse click event
*/
```

Also available as an Observable creator:
```typescript
import { takeUntil, fromEvent } from 'light-observable/observable'
import {  } from 'light-observable/operators'

const stream = takeUntil(fromEvent('click', document), fromEvent('mousemove', document))

stream.subscribe(console.log)
/*
 log mousemove events until the mouse click event
*/
```