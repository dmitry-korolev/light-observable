# `catchError`
```typescript
type catchError = <T, R = any>(
  fn: (reason: R) => Observable<T>
) => (stream: Observable<T>) => Observable<T>
```

```
errorStream:                -a-b-c-X
f(X):                       -d-e-f|
catchError(f)(errorStream): -a-b-c--d-e-f|
```

Recover from an observable failure by calling a function to create a new observable.

```typescript
import { throwError, of } from 'light-observable/observable'
import { catchError } from 'light-observable/operators'

const errorStream = throwError('error!')
const result = errorStream.pipe(
  catchError(error => of(error))
)
result.subscribe({
  next: console.log,
  complete: () => console.log('complete normally')
})
/*
 -> 'error!'
 -> 'complete normally'
*/

```

Also available as an Observable creator:

```typescript
import { catchError, throwError, of } from 'light-observable/observable'

const errorStream = throwError('error!')
const result = catchError(error => of(error), errorStream)
result.subscribe({
  next: console.log,
  complete: () => console.log('complete normally')
})
/*
 -> 'error!'
 -> 'complete normally'
*/
```
