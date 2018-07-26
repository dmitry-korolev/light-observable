# `throwError`
```typescript
type throwError = <T = any>(error: T) => Observable<never>
```

```
throwError(X): X
```

Creates an Observable that throws provided `error` immediately after subscription.
```typescript
import { interval, of } from 'light-observable/observable'
import { map, mergeMap, throwError } from 'light-observable/operators'

const stream = interval(1000).pipe(
  map(() => Math.random() > 0.5 ? 42 : 13),
  mergeMap(x => {
    if (x !== 42) {
      return throwError('42 should be the answer')
    } else {
      return of(42)
    }
  })
)
```
