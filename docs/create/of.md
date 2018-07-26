# `of`
```typescript
type of = <TS extends Array<any>>(
  ...values: TS
) => Observable<TS extends Array<infer T> ? T : null>
```

```
of(a, b, c): abc|
```

Creates an Observable of the `values` provided as arguments. The values are delivered synchronously when `subscribe` is called.

```typescript
import { of } from 'light-observable/observable'

const stream = of(1, 2, 3)
stream.subscribe(console.log)

/*
 -> 1
 -> 2
 -> 3
*/
```
