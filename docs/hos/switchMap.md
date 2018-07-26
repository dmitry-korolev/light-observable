# `switchMap`
```typescript
type switchMap = <T, R>(
  fn: (value: T, index: number) => Observable<R> | Iterable<R>
) => (stream: Observable<T>) => Observable<R>
```

```
stream:                a-------b---c->
fn(x):                 x-x-x-x-x-x-x->
switchMap(fn)(stream): a-a-a-a-b-b-c->
```

Projects each value from the source `stream` to an Observable and switches the output Observable to emit values from the most recent projected Observable.

```typescript
import { fromEvent, interval } from 'light-observable/observable'
import { switchMap } from 'light-observable/operators'

const clicks = fromEvent(document, 'click')
const stream = clicks.pipe(
  switchMap((ev) => interval(1000))
)

stream.subscribe(x => console.log(x))

/*
 Restarts an interval observa
*/
```

Also available as an Observable creator:
```typescript
import { switchMap, fromEvent, interval } from 'light-observable/observable'

const stream = switchMap((ev) => interval(1000), fromEvent(document, 'click'))

stream.subscribe(x => console.log(x))

/*
 Restarts an interval observa
*/
```

