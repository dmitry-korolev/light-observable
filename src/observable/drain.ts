import { Subscribable } from '../core/types.h'
import { forEach } from './forEach'

export const drain = (stream: Subscribable<any>): Promise<void> => {
  return forEach(undefined, stream)
}
