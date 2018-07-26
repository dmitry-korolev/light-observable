# `NEVER`
```typescript
type never = Observable<never>
```

```
NEVER:   --->
never(): --->
```

Represents an empty observable which never emits nor completes.

```typescript
import { NEVER, never } from 'light-observable/observable'

NEVER.subscribe({ complete: () => console.log('This will never ever happen') })
never().subscribe({ complete: () => console.log('This will never happen neither') })

/*
 crickets chirping...
*/
```

