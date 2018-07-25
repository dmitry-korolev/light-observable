# `interval`
```typescript
type interval = (period: number) => Observable<number>
```

```
interval(2): -0-1-2-3-4-5->
interval(5): ----0----1----2->
```

Creates an Observable that emits sequential numbers every specified interval of time.

```typescript
import { interval } from 'light-observable/observable'

const numbers = interval(1000)
numbers.subscribe(console.log)

/*
 -> 0 // 1000ms
 -> 1 // 2000ms
 -> 2 // 3000ms
 ...
 -> Infinity
*/
```
