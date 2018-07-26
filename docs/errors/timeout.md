# `timeout`
```typescript
type timeout = (time: number) => <T>(stream: Observable<T>) => Observable<T>
```

```
streamA:             --a--b--c--d--->
timeout(3)(streamA): --a--b--c--d--->

streamB:             ----a--b--c--d->
timeout(3)(streamA): --X
```

Returns an Observable that throws an error if the source `stream` doesn't emit within specified amount of `time` in ms and mirrors the source `stream` otherwise.

```typescript
import { defer } from 'light-observable/observable'
import { timeout } from 'light-observable/operators'

const request = defer(() => fetch(params)).pipe(
  timeout(1000)
)

request.subscribe(
  result => console.log(result), // Logs if request completed within specified timeout
  error => console.log(error) // Logs if request did not complete within timeout
)
```

Also available as an Observable creator:
```typescript
import { timeout, defer } from 'light-observable/observable'

const request = timeout(1000, defer(() => fetch(params)))

request.subscribe(
  result => console.log(result), // Logs if request completed within specified timeout
  error => console.log(error) // Logs if request did not complete within timeout
)
```