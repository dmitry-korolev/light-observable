import { Subscribable } from '../core/types.h'
import { forEach } from '../observable/forEach'

export const drain = () => (stream: Subscribable<any>): Promise<void> => {
  return forEach(undefined, stream)
}
