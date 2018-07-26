# `sample`
```typescript
type sample = (signal: Observable<any>) => <T>(source: Observable<T>) => Observable<T>
```

```
source:                 -a--b-cd----d->
signal:                 --x--x--x--x-->
sample(signal)(source): --a--b--d----->
```

Emits the most recently emitted value from the source Observable whenever another Observable, the `signal`, emits.


```typescript
import { fromEvent } from 'light-observable/observable'
import { sample } from 'light-observable/operators'

const stream = fromEvent(document, 'mousemove').pipe(
  sample(fromEvent(document, 'keydown'))
) 

stream.subscribe(console.log)
/*
  logs mousemove event on every keydown event
*/
```

Also available as an Observable creator:
```typescript
import { sample, fromEvent } from 'light-observable/observable'

const stream = sample(fromEvent(document, 'keydown'), fromEvent(document, 'mousemove'))

stream.subscribe(console.log)
/*
  logs mousemove event on every keydown event
*/
```