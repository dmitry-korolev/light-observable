# `defer`
```typescript
type defer = <T>(fn: () => T) => Observable<T extends Promise<infer R> ? R : T>
```

```
f():      ---a
defer(f): ---a|
```

Creates an Observable that executes provided `fn` on subscribe and uses it's result. Handles async functions, emitting upon resolution. This is similar to the `fromPromise` method, but allows to delay an execution of heavy operation until the subscription happens.

```typescript
import { defer } from 'light-observable/observable'

const fetchNumbers = defer(() => Promise.resolve(1))
fetchNumbers.subscribe(console.log)
/*
 -> 1
*/
```

