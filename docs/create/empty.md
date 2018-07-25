# `EMPTY`
```typescript
type EMPTY = Observable<any>
```

```
EMPTY: |
```

Represents an empty observable which emits `complete` event immediately after subscription.

```typescript
import { EMPTY, empty } from 'light-observable/observable'

EMPTY.subscribe(console.log)
empty().subscribe(console.log)

/*
 crickets chirping...
*/
```

