# `fromPromise`
```typescript
type fromPromise = <T>(promise: Promise<T>) => Observable<T>
```

```
promise:              -----a
fromPromise(promise): -----a|
```

Creates an Observable, that waits for the provided promise to resolve or reject. Emits resolved value and completes in the first case, errors in the second case.
```typescript
import { fromPromise } from 'light-observable/observable'

const fetchData = (params) => fromPromise(fetch(params))
const stream = fetchData(...)

stream.subscribe(console.log)
```
