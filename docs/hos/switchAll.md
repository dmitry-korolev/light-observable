# `switchAll`
```typescript
type switchAll = () => <T>(
  stream: Observable<Observable<T> | Iterable<T>>
) => Observable<T>
```

```
s:                     -a-b-c-d-e-f->
t:                     -1-2-3-4-5-6->
stream:                -s-----t----->
switchAll()(stream):   -a-b-c-4-5-6->
```

Given a higher-order `stream`, return a new stream that mirrors the most recent inner stream.

```typescript
import { Observable } from 'light-observable'
import { interval } from 'light-observable/observable'
import { switchAll } from 'light-observable/operator'

const stream = new Observable(observer => {
  observer.next(interval(500))
  
  setTimeout(() => observer.next(interval(500)), 1000)
  setTimeout(() => observer.next(interval(500)), 2000)
}).pipe(
  switchAll()
)

stream.subscribe(console.log)
/*
 -> 0 // 500ms
 -> 1 // 1000ms
 -> 0 // 1500ms
 -> 1 // 2000ms
 -> 0 // 2500ms
 -> 1 // 3000ms
 -> 2 // 3500ms
 -> 3 // 4000ms
 ...
*/
```

Also available as an Observable creator:
```typescript
import { Observable } from 'light-observable'
import { switchAll, interval } from 'light-observable/observable'

const stream = switchAll(new Observable(observer => {
  observer.next(interval(500))
  
  setTimeout(() => observer.next(interval(500)), 1000)
  setTimeout(() => observer.next(interval(500)), 2000)
}))

stream.subscribe(console.log)
/*
 -> 0 // 500ms
 -> 1 // 1000ms
 -> 0 // 1500ms
 -> 1 // 2000ms
 -> 0 // 2500ms
 -> 1 // 3000ms
 -> 2 // 3500ms
 -> 3 // 4000ms
 ...
*/
```

