# `from`
```typescript
type from = <T>(ish: Observable<T> | Iterable<T>) => Observable<T>
```

```
observable:       -a-b-c-d-|
from(observable): -a-b-c-d-|

iterable:       abc
from(iterable): abc|
```

Converts `ish` argument to an Observable. 

If the argument has a Symbol.observable method, then it returns the result of invoking that method. If the resulting object is not an instance of Observable, then it is wrapped in an Observable which will delegate subscription.
```typescript
import { from } from 'light-observable/observable'

const observableStore = from({
  [Symbol.observable] () {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('hello')
        observer.next('world')
        observer.complete()
      }, 2000)
    })
  }
})

from(observableStore).subscribe({
  next: console.log,
  complete: () => console.log('complete')
})
/*
 -> 'hello'
 -> 'world'
 -> 'complete'
*/


```

Otherwise, the argument is assumed to be an iterable and the iteration values are delivered synchronously when subscribe is called.
```typescript
import { from } from 'light-observable/observable'

function *fibonacci(n) {
  const infinite = !n && n !== 0
  let current = 0
  let next = 1
  
  while (infinite || n--) {
    yield current
    [current, next] = [next, current + next]
  }
}

from(fibonacci(5)).subscribe(console.log)
/*
 -> 0
 -> 1
 -> 1
 -> 2
 -> 3
*/
```

Strings and arrays are also Iterable, so this will work:
```typescript
import { from } from 'light-observable/observable'

from([1, 2, 3]).subscribe(console.log)
/*
 -> 1
 -> 2
 -> 3
*/

from('hello').subscribe(console.log)
/*
 -> 'h'
 -> 'e'
 -> 'l'
 -> 'l'
 -> 'o'
*/
```