import { Observable } from '../core/Observable'
import { Subscribable } from '../core/types.h'
import { curry } from '../helpers/curry'
import { auditTime as auditTimeObservable } from '../observable/auditTime'

export const auditTime: (time: number) => <T>(stream: Subscribable<T>) => Observable<T> = curry(
  auditTimeObservable
) as any
